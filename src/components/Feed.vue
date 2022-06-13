<template>
    <div>
        <McvLoading v-if="isLoading" />
        <div v-if="error">Error</div>
        <div v-if="feed">
            <div
                class="article-preview"
                v-for="(article, index) in feed.articles"
                :key="index"
            >
                <div class="article-meta">
                    <router-link
                        :to="{
                            name: 'userProfile',
                            params: { slug: article.author.username },
                        }"
                    >
                        <img :src="article.author.image" />
                    </router-link>
                    <div class="info">
                        <router-link
                            :to="{
                                name: 'userProfile',
                                params: { slug: article.author.username },
                            }"
                            class="author"
                        >
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">{{ article.createdAt }}</span>
                    </div>
                    <div class="pull-xs-right">
                        <!-- <button
                            class="btn btn-sm btn-outline-primary"
                            @click="onToggleFavorite(article)">
                        </button> -->
                        ADD TO FAVORITES
                    </div>
                </div>
                <router-link
                    :to="{
                        name: 'article',
                        params: { slug: article.slug },
                    }"
                    class="preview-link"
                >
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                    TAG LIST
                </router-link>
            </div>
            <McvPagination
                :total="feed.articlesCount"
                :limit="limit"
                :currentPage="currentPage"
                :url="baseUrl"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/feed";
import McvPagination from "@/components/Pagination";
import { limit } from "@/helpers/vars";
import { stringify, parseUrl } from "query-string";
import McvLoading from "@/components/Loading";

export default {
    name: "McvFeed",
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            limit,
            url: "/tags/dragons",
        };
    },
    components: {
        McvPagination,
        McvLoading,
    },
    computed: {
        ...mapState({
            isLoading: (state) => state.feed.isLoading,
            feed: (state) => state.feed.data,
            error: (state) => state.feed.error,
        }),
        currentPage() {
            return Number(this.$route.query.page || 1);
        },
        baseUrl() {
            return this.$route.path;
        },
        offset() {
            return this.currentPage * limit - limit;
        },
    },
    watch: {
        currentPage() {
            this.fetchFeed();
        },
    },
    mounted() {
        this.fetchfeed();
    },
    methods: {
        fetchfeed() {
            const parsedUrl = parseUrl(this.apiUrl);
            const stringifiedParams = stringify({
              limit,
              offset: this.offset,
              ...parsedUrl.query
            });
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
            this.$store.dispatch(actionTypes.getFeed, {
                apiUrl: apiUrlWithParams,
            });
        },
    },
};
</script>



// {
//   "articles": [
//     {
//       "slug": "Create-a-new-implementation-1",
//       "title": "Create a new implementation",
//       "description": "join the community by creating a new implementation",
//       "body": "Share your knowledge and enpower the community by creating a new implementation",
//       "tagList": [
//         "implementations"
//       ],
//       "createdAt": "2021-11-24T12:11:08.212Z",
//       "updatedAt": "2021-11-24T12:11:08.212Z",
//       "favorited": false,
//       "favoritesCount": 2654,
//       "author": {
//         "username": "Gerome",
//         "bio": null,
//         "image": "https://api.realworld.io/images/demo-avatar.png",
//         "following": false
//       }
//     },
//     {
//       "slug": "Explore-implementations-1",
//       "title": "Explore implementations",
//       "description": "discover the implementations created by the RealWorld community",
//       "body": "Over 100 implementations have been created using various languages, libraries, and frameworks.\n\nExplore them on CodebaseShow.",
//       "tagList": [
//         "codebaseShow",
//         "implementations"
//       ],
//       "createdAt": "2021-11-24T12:11:07.952Z",
//       "updatedAt": "2021-11-24T12:11:07.952Z",
//       "favorited": false,
//       "favoritesCount": 1545,
//       "author": {
//         "username": "Gerome",
//         "bio": null,
//         "image": "https://api.realworld.io/images/demo-avatar.png",
//         "following": false
//       }
//     },
//     {
//       "slug": "Welcome-to-RealWorld-project-1",
//       "title": "Welcome to RealWorld project",
//       "description": "Exemplary fullstack Medium.com clone powered by React, Angular, Node, Django, and many more",
//       "body": "See how the exact same Medium.com clone (called Conduit) is built using different frontends and backends. Yes, you can mix and match them, because they all adhere to the same API spec",
//       "tagList": [
//         "welcome",
//         "introduction"
//       ],
//       "createdAt": "2021-11-24T12:11:07.557Z",
//       "updatedAt": "2021-11-24T12:11:07.557Z",
//       "favorited": false,
//       "favoritesCount": 1094,
//       "author": {
//         "username": "Gerome",
//         "bio": null,
//         "image": "https://api.realworld.io/images/demo-avatar.png",
//         "following": false
//       }
//     }
//   ],
//   "articlesCount": 3
// }