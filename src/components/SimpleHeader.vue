<!--
 * @Author: curechen 981470148@qq.com
 * @Date: 2023-01-08 10:21:11
 * @LastEditors: curechen 981470148@qq.com
 * @LastEditTime: 2023-02-03 11:05:47
 * @FilePath: \GraduationProject\local-life-mall\src\components\SimpleHeader.vue
 * @Description: 
-->
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
  <header class="simple-header van-hairline--bottom">
    <i v-if="!isback" class="nbicon nbfanhui" @click="goBack"></i>
    <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
    <div class="simple-header-name">{{ name }}</div>
    <van-popover
      v-if="name !== '登录' && name !== '注册'"
      v-model:show="showPopover"
      :actions="actions"
      @select="onSelect"
      class="popover_edit"
    >
      <template #reference>
        <!-- <van-button type="primary">浅色风格</van-button> -->
        <i class="nbicon nbmore"></i>
      </template>
    </van-popover>
    <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;</i>
  </header>
  <div class="block" />
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { logout } from '@/service/user'
import { setLocal } from '@/common/js/utils'

export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    back: {
      type: String,
      default: "",
    },
    noback: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["callback"],
  setup(props, ctx) {
    const isback = ref(props.noback)
    const router = useRouter()
    const goBack = () => {
      if (!props.back) {
        router.go(-1)
      } else {
        router.push({ path: props.back })
      }
      ctx.emit("callback")
    }

    const showPopover = ref(false)

    // 通过 actions 属性来定义菜单选项
    const actions = [{ text: "退出登录" }]
    const onSelect = async () => {
      const { resultCode } = await logout()
      if (resultCode == 200) {
        setLocal('token', '')
        // window.location.href = '/#/home'
        router.push({ path: '/home' })
      }
    }

    return {
      goBack,
      isback,
      actions,
      onSelect,
      showPopover,
    }
  },
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .fj();
  .wh(100%, 44px);
  line-height: 44px;
  padding: 0 10px;
  .boxSizing();
  color: #252525;
  background: #fff;
  .simple-header-name {
    font-size: 14px;
  }
}
.block {
  height: 44px;
}
</style>
<style lang="less">
.popover_edit {
  left: 240px !important;
  right: 10px;
  .van-popover__arrow {
    left: 83% !important;
  }
}
</style>
