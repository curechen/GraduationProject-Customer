<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header wrap">
        <i class="nbicon nbfanhui" @click="goBack"></i>
        <div class="header-search">
          <!-- <i class="nbicon nbSearch"></i> -->
          <van-icon name="search" class="search-icon" />
          <input
            type="text"
            class="search-title"
            v-model="keyword"
            @keyup.enter="getSearch"
          />
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>

      <van-tabs type="card" color="#d53a46" @click="changeTab">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>

    <div class="content">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        class="product-list-refresh"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :finished-text="finishedText"
          @load="onLoad"
          @offset="10"
        >
          <!-- <p v-for="item in list" :key="item">{{ item }}</p> -->
          <template v-if="productList.length">
            <div
              class="product-item"
              v-for="(item, index) in productList"
              :key="index"
              @click="productDetail(item)"
            >
              <img :src="$filters.prefix(item.goodsCoverImg)" />
              <div class="product-info">
                <p class="name">{{ item.goodsName }}</p>
                <p class="subtitle">{{ item.goodsIntro }}</p>
                <span class="price">￥ {{ item.sellingPrice }}</span>
              </div>
            </div>
          </template>
          <!-- <img class="empty" v-else src="https://s.yezgea02.com/1604041313083/kesrtd.png" alt="搜索"> -->
          <img
            class="empty"
            v-else
            src="@/assets/search-default.png"
            alt="搜索"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue"
import { useRoute, useRouter } from "vue-router"
import { search } from "@/service/good"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      keyword: route.query.keyword || "",
      searchBtn: false,
      seclectActive: false,
      refreshing: false,
      list: [],
      loading: false,
      finished: false,
      productList: [],
      totalPage: 0,
      page: 1,
      orderBy: "",
      finishedText: '搜索想要的商品',
    })

    // onMounted(() => {
    //   init()
    // })

    const init = async () => {
      const { categoryId } = route.query
      if (!categoryId && !state.keyword) {
        // Toast.fail('请输入关键词')
        state.finished = true
        state.loading = false
        return
      }
      const {
        data,
        data: { list },
      } = await search({
        pageNumber: state.page,
        goodsCategoryId: categoryId,
        keyword: state.keyword,
        orderBy: state.orderBy,
      })
      // state.productList = state.productList.concat(list)
      if (list !== null) state.productList = state.productList.concat(list)
      state.finishedText = state.productList.length === 0 ? '没有相关商品' : '没有更多了'
      state.totalPage = data.totalPage
      state.loading = false
      if (state.page >= data.totalPage) state.finished = true
    }

    const goBack = () => {
      router.go(-1)
    }

    const productDetail = (item) => {
      router.push({ path: `/product/${item.goodsId}` })
    }

    const getSearch = () => {
      onRefresh()
    }

    const onLoad = () => {
      if (!state.refreshing && state.page < state.totalPage) {
        state.page = state.page + 1
      }
      if (state.refreshing) {
        state.productList = []
        state.refreshing = false
      }
      init()
    }

    const onRefresh = () => {
      state.refreshing = true
      state.finished = false
      state.loading = true
      state.page = 1
      onLoad()
    }

    const changeTab = (name) => {
      console.log("name", name)
      state.orderBy = name
      onRefresh()
    }

    return {
      ...toRefs(state),
      goBack,
      productDetail,
      getSearch,
      changeTab,
      onLoad,
      onRefresh,
    }
  },
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  .category-header {
    .fj();
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }
    .header-search {
      display: flex;
      align-items: center;
      width: 76%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #f7f7f7;
      .borderRadius(20px);
      .search-icon {
        padding: 0 5px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        background: #f7f7f7;
      }
    }
    .icon-More {
      font-size: 20px;
    }
    .search-btn {
      height: 28px;
      line-height: 28px;
      font-size: 13px;
      margin: 5px 0;
      padding: 0 10px;
      color: #fff;
      background: @primary;
      opacity: 0.85;
      .borderRadius(18px);
      margin-top: 10px;
    }
  }
}
.content {
  height: calc(~"(100vh - 83px)");
  // overflow: hidden;
  overflow-y: scroll;
  margin-top: 83px;
}
.product-list-refresh {
  height: 100%;
  .product-item {
    .fj();
    width: 100%;
    height: 120px;
    padding: 10px 0;
    border-bottom: 1px solid #dcdcdc;
    img {
      width: 140px;
      height: 120px;
      padding: 0 10px;
      .boxSizing();
    }
    .product-info {
      width: 56%;
      height: 120px;
      padding: 5px;
      text-align: left;
      .boxSizing();
      p {
        margin: 0;
      }
      .name {
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .subtitle {
        width: 100%;
        max-height: 20px;
        padding: 10px 0;
        line-height: 25px;
        font-size: 13px;
        color: #999;
        overflow: hidden;
      }
      .price {
        color: @primary;
        font-size: 16px;
      }
    }
  }
  .empty {
    display: block;
    width: 150px;
    margin: 0 auto 20px;
    padding-top: 250px;
  }
}

.van-pull-refresh {
  overflow: scroll !important; // 修改组件原生样式，使得组件可以滚动
}
</style>
