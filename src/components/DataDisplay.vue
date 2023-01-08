<template>
    <h2 style="color: #fd0338;">当前总成交数：{{ state.goodsOrdersDatesValuesAll }}</h2>
    <div id="main" style="width: 100%;height:100%;"></div>
</template>

<script lang="ts">
import { GoodsOrder } from "@/interface";
import api from "../api/api"
import { defineComponent, reactive, onBeforeMount } from "vue";
import { message } from "ant-design-vue";
import * as echarts from 'echarts';

interface state {
    goodsSplitOrders: GoodsOrder[],
    goodsOrdersDate: any[],
    index: number,
    goodsOrdersDatesKeys: any[],
    goodsOrdersDatesValues: number[],
    goodsOrdersDatesValuesAll: number
}

export default defineComponent({
    name: "dataDisplay",

    setup() {
        const state = reactive<state>({
            goodsSplitOrders: [],
            goodsOrdersDate: [],
            index: 1,
            goodsOrdersDatesKeys: [],
            goodsOrdersDatesValues: [],
            goodsOrdersDatesValuesAll: 0
        });

        onBeforeMount(() => {
            api.getAllGoodsOrder().then((res: any) => {
                if (res.code == 200) {
                    state.goodsSplitOrders = res.data
                    state.goodsSplitOrders.forEach((goodsSplitOrder: GoodsOrder) => {
                        if (goodsSplitOrder.completeTime != null) {
                            goodsSplitOrder.completeTime = goodsSplitOrder.completeTime.split('T')[0]
                        }
                    })
                } else {
                    message.error(res.description)
                }
            }).then(() => {
                for (var i = 0; i < state.goodsSplitOrders.length; i++) {
                    state.goodsOrdersDate.push(state.goodsSplitOrders[i].completeTime)
                }

                state.goodsOrdersDate.sort()

                for (var x = 1; x < state.goodsOrdersDate.length; x++) {
                    if (state.goodsOrdersDate[x] != state.goodsOrdersDate[x - 1]) {
                        state.index++
                    }
                }

                for (var y = 0; y < state.index; y++) {
                    state.goodsOrdersDatesValues[y] = 1
                }

                var j = 0;
                for (var z = 1; z < state.goodsOrdersDate.length; z++) {
                    if (state.goodsOrdersDate[z] == state.goodsOrdersDate[z - 1]) {
                        state.goodsOrdersDatesKeys[j] = state.goodsOrdersDate[z]
                        state.goodsOrdersDatesValues[j]++
                    }
                    else {
                        j++
                        state.goodsOrdersDatesKeys[j] = state.goodsOrdersDate[z]
                    }
                }

                state.goodsOrdersDatesValues.forEach((value: number) => {
                    state.goodsOrdersDatesValuesAll += value
                })

            }).then(() => {
                type EChartsOption = echarts.EChartsOption;

                var chartDom = document.getElementById('main')!;
                var myChart = echarts.init(chartDom);
                var option: EChartsOption;

                option = {
                    xAxis: {
                        type: 'category',
                        data: state.goodsOrdersDatesKeys
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            type: 'bar',
                            data: state.goodsOrdersDatesValues
                        }
                    ]
                };

                option && myChart.setOption(option);
            })
        })

        return {
            state
        };
    },
});
</script>

<style scoped>

</style>