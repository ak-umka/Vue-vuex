<template>
    <div class="article-page">
        <div class="banner">
            <div class="container" v-if="article">
                <h1>{{ article.title }}</h1>
                <div class="acticle-meta">
                    <router-link
                        :to="{
                            name: 'userProfile', params: {slug: article.author.username},
                        }"
                    >
                        <img :src="article.author.image" />
                    </router-link>
                    <div class="info">
                        <router-link
                            :to="{
                                name: 'userProfile', params: {slug: article.author.username},
                            }"
                        >
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">{{ article.createdAt }}</span>
                    </div>
                    <span>
                        <router-link
                            class="btn btn-outline-secondary btn-sm"
                            :to="{
                                name: 'editArticle',
                                params: { slug: article.slug },
                            }"
                        >
                            <i class="ion-edit" />
                            Edit
                        </router-link>
                        <button class="btn btn-outline-danger btn-sm">
                            <i class="ion-trash-a" />
                            Delete
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <div class="container page">
          
        </div>
    </div>
</template>

<script>
import { actionTypes } from "@/store/modules/article";
import { mapState } from "vuex";

export default {
    name: "McvArticle",
    computed: {
        ...mapState({
            isLoading: (state) => state.article.isLoading,
            error: (state) => state.article.error,
            article: (state) => state.article.data,
        }),
    },
    mounted() {
        console.log(this.article);
        this.$store.dispatch(actionTypes.getArticle, {
            slug: this.$route.params.slug,
        });
    },
};
</script>