/*
 * @Author: curechen 981470148@qq.com
 * @Date: 2023-01-08 10:21:11
 * @LastEditors: curechen 981470148@qq.com
 * @LastEditTime: 2023-01-08 14:31:13
 * @FilePath: \GraduationProject\local-life-mall\src\store\actions.js
 * @Description: 
 */
/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

import { getCart } from '../service/cart'

export default {
  async updateCart(ctx) {
    const { data } = await getCart()
    ctx.commit('addCart', {
      count: data?.length || 0
    })
  }
}
