<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <vx-card title="国内疫情总览">
          <!-- CARD ACTION -->
          <p slot="actions">
            {{ this.chinaDayList[this.dayAmount - 1].y +'.'+ this.chinaDayList[this.dayAmount-1].date}}
          </p>
          <div slot="no-body" class="mt-20">
            <div class="flex flex-row justify-between px-8 pb-4 mt-4">
              <p class="text-center"><span class="block text-2xl">现存确诊</span>
                <span class="text-4xl" style="color:crimson">{{this.chinaDayList[this.dayAmount-1].nowConfirm}}</span>
              </p>
              <p class="text-center mr-3"><span class="block text-2xl">无症状感染</span><span class="text-4xl"
                  style="color:lightyellow">{{this.chinaDayList[this.dayAmount-1].noInfect}}</span></p>
              <p class="text-center"><span class="block text-2xl">境外输入</span><span class="text-4xl"
                  style="color:cadetblue">{{this.chinaDayList[this.dayAmount-1].importedCase}}</span></p>
            </div>
            <div class="flex flex-row justify-between px-8 pb-4 mt-5">
              <p class="text-center"><span class="block text-2xl">累计确诊</span><span class="text-4xl"
                  style="color:orangered">{{this.chinaDayList[this.dayAmount-1].confirm}}</span></p>
              <p class="text-center"><span class="block text-2xl">累计死亡</span><span class="text-4xl"
                  style="color:dimgray">{{this.chinaDayList[this.dayAmount-1].dead}}</span></p>
              <p class="text-center"><span class="block text-2xl">累计治愈</span><span class="text-4xl"
                  style="color:limegreen">{{this.chinaDayList[this.dayAmount-1].heal}}</span></p>
            </div>
          </div>
        </vx-card>
      </div>
      <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <vx-card title="省市疫情概况">
          <!-- CARD ACTION -->
          <vs-dropdown slot="actions" vs-trigger-click class="cursor-pointer mr-8">
            <p class="flex cursor-pointer text-4xl">{{this.cityNameSet[this.curCityIndex]}} <feather-icon
                icon='ChevronDownIcon' svgClasses='h-4 w-4' class='ml-1'></feather-icon>
            </p>
            <vs-dropdown-menu class="w-32">
              <vs-dropdown-item v-for="(name, index) in cityNameSet" @click="onCityNameChanged(index)">
                {{name}}
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
          <div slot="no-body" class="mt-8">
            <div class="flex flex-row justify-between px-8 pb-4 mt-4">

            </div>
            <div class="flex flex-row justify-between px-8 pb-4 mt-4">
              <p class="text-center"><span class="block text-2xl ml-2">本省确诊</span>
                <span class="text-4xl" style="color:crimson">{{
                  this.cityDataMap[this.cityNameSet[this.curCityIndex]].nowConfirm }}</span>
                <small>
                  {{'+'+this.cityDataMap[this.cityNameSet[this.curCityIndex]].confirmAdd}}</small>
              </p>
              <p class="text-center"><span class="block text-2xl">本省累计确诊</span><span class="text-4xl" style="color:orangered">{{
                  this.cityDataMap[this.cityNameSet[this.curCityIndex]].confirm }}</span></p>
            </div>
            <div class=" flex flex-row justify-between px-8 pb-4 mt-4">
                  <p class="text-center"><span class="block text-2xl">本省累计死亡</span><span class="text-4xl" style="color:dimgray">{{
                      this.cityDataMap[this.cityNameSet[this.curCityIndex]].dead }}</span></p>
                  <p class="text-center"><span class="block text-2xl">本省累计治愈</span><span class="text-4xl" style="color:limegreen">{{
                      this.cityDataMap[this.cityNameSet[this.curCityIndex]].heal }}</span></p>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <vx-card title="近七日密接增长">
          <div slot="no-body" class="p-6 pb-0">
            <div class="flex">
              <div>
                <p class="text-xl mb-1 ml-2 font-bold">单日最高</p>
                <p class="text-3xl ml-2 "><sup class=" mr-1"></sup>{{Math.max(...this.closeRateSpline.series[0].data)}}
                </p>
              </div>
            </div>
          </div>
          <vue-apex-charts type=area height=266px :options="this.closeRateSpline.chartOptions"
            :series="this.closeRateSpline.series" />
        </vx-card>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base ">
        <vx-card title="近七日确诊增长">
          <div slot="no-body" class="p-6 pb-0">
            <div class="flex">
              <div>
                <p class="text-xl mb-1 ml-2 font-bold">单日最高</p>
                <p class="text-3xl ml-2 "><sup class=" mr-1"></sup>{{Math.max(...this.diagRateSpline.series[0].data)}}
                </p>
              </div>
            </div>
          </div>
          <vue-apex-charts type=area height=266px :options="this.diagRateSpline.chartOptions"
            :series="this.diagRateSpline.series" />
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2 mb-base">
        <vx-card>
          <div class="vx-row flex-col-reverse lg:flex-row">

            <!-- LEFT COL -->
            <div class="vx-col w-full lg:w-1/2 xl:w-1/2 flex flex-col justify-between">
              <div>
                <span class="font-medium">平均增长</span>
                <h2 class="mb-1 font-bold">{{ parseInt(this.sum / 7) }}</h2>
                <p class="mt-2 text-xl font-medium"><span class='text-danger'>+{{ "25.2 %" }}</span> 相比上周 </p>
              </div>
            </div>
            <!-- RIGHT COL -->
            <div class="vx-col w-full lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 mb-base">
              <vue-apex-charts type=bar height=400px :options="this.cardChartSpline.chartOptions"
                :series="this.cardChartSpline.series" />
            </div>
          </div>
          <vs-divider class="my-6"></vs-divider>
          <div class="vx-row">
            <div class="vx-col w-1/2 mb-3">
              <p>确诊总增长: {{this.confirmedSum}}</p>
              <vs-progress class="block mt-1" :percent="60" color="danger"></vs-progress>
            </div>
            <div class="vx-col w-1/2 mb-3">
              <p>密接总增长: {{this.closeSum}}</p>
              <vs-progress class="block mt-1" :percent="50" color="warning"></vs-progress>
            </div>
          </div>
        </vx-card>
      </div>
      <div class="vx-col md:w-1/2 mb-base">
        <vx-card>
          <vue-apex-charts type="area" height="467" width="100%" :options="this.increChartSpline.chartOptions"
            :series="this.increChartSpline.series"></vue-apex-charts>
        </vx-card>
      </div>
    </div>
    <div id="synced-charts">
      <div id="chart-line"></div>
      <div id="chart-column"></div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine";
import VxCard from "../components/vx-card/VxCard.vue";
import { findUp2DateEpidemicData, addr2Point } from "@/api/getData";
let curWeek = []
let confirmed = []
let closeContact = [1230, 1123, 2335, 3401, 4013, 4912, 5420]
const themeColors = ['#00F7C0', '#0068ff']

export default {
  data() {
    return{
      rEpiData: [],
      rCityData: [],
      pCityData: [],
      cityData: [],
      cityNameSet: [],
      curCityIndex: 0,
      cityDataMap: {},
      epidemicData: {},
      chinaDayList:[],
      provinceCompare:{},
      closeSum: 0,
      confirmedSum: 0,
      sum: 0,
      dayAmount: 0,
      diagRateSpline: {
        series: [{
          name: '确诊者',
          data: confirmed,
          type: 'line'
        }],
        chartOptions: {
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0
            }
          },
          chart: {
            type: 'line',
            //sparkline: { enabled: true },
            toolbar: { show: false },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
          },
          fill: {
            type: 'solid'
          },
          colors: ['#ee2b47'],
          xaxis: {
            title: {
              style: {
                fontWeight: 'lighter',
              }
            },
            type: 'String',
            categories: curWeek,
          },
          yaxis: [{
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: { left: 0, right: 0 },
          }],
          tooltip: {
            x: { show: false }
          },
        },
      },
      closeRateSpline: {
        series: [{
          name: '密接者',
          data: closeContact,
          type: 'line'
        }],
        chartOptions: {
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0
            }
          },
          chart: {
            type: 'line',
            //sparkline: { enabled: true },
            toolbar: { show: false },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
          },
          fill: {
            type: 'solid'
          },
          colors: ['#ff9a00'],
          xaxis: {
            title: {
              style: {
                fontWeight: 'lighter',
              }
            },
            type: 'String',
            categories: curWeek,
          },
          yaxis: [{
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: { left: 0, right: 0 },
          }],
          tooltip: {
            x: { show: false }
          },
        },
      },
      increChartSpline: {
        series: [
          {
            name: '确诊增长人数',
            type: "column",
            data: confirmed
          },
          {
            name: '密接增长人数',
            type: "column",
            data: closeContact
          }],
        chartOptions: {
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0
            }
          },
          chart: {
            type: 'area',
            // sparkline: { enabled: true },
            toolbar: { show: false },
          },
          fill: {
            type: 'solid'
          },
          title: {
            text: '近七日确诊及密接增长人数',
            align: 'middle',
            style: {
              fontSize: '20px'
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
          },
          colors: themeColors,
          xaxis: {
            title: {
              text: '日期',
              style: {
                fontWeight: 'lighter',
              }
            },
            type: 'String',
            categories: curWeek,
          },
          yaxis: {
            title: {
              text: '人数',
              rotate: 90,
              style: {
                fontWeight: 'lighter',
              }
            }
          }
        }
      },
      cardChartSpline: {
        series: [
          {
            name: '确诊增长人数',
            type: "column",
            data: confirmed
          },
          {
            name: '密接增长人数',
            type: "column",
            data: closeContact
          }],
        chartOptions: {
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0
            }
          },
          chart: {
            type: 'area',
            sparkline: { enabled: true },
            toolbar: { show: false },
            stacked: true,
          },
          title: {
            text: '近七日确诊及密接增长人数',
            align: 'middle',
            style: {
              fontSize: '20px'
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: themeColors,
          xaxis: {
            title: {
              text: '日期',
              style: {
                fontWeight: 'lighter',
              }
            },
            type: 'datetime',
            categories: curWeek,
          },
          yaxis: {
            title: {
              text: '人数',
              rotate: 90,
              style: {
                fontWeight: 'lighter',
              }
            }
          }
        }
      },
    }
  },
  computed: {
  },
  methods: {
    fetchEpidemicData() {
      const storedEpiData = localStorage.getItem('epidemicData')
      const storedCityData = localStorage.getItem('cityData')
      const storedExpire = localStorage.getItem('expire') // 过期时间
      const now = Date.now()
      // r开头 row原始数据
      // p开头 phrased解析过的数据
      // f开头 final最终数据
      if (!storedEpiData || storedEpiData == '{}' || !storedCityData || storedCityData == '[]' || now > storedExpire) {
        console.log("if")
        findUp2DateEpidemicData().then((response) => {
          this.rEpiData = response.data.data
          this.pEpiData = JSON.parse(this.rEpiData)
          // 处理省市疫情数据
          this.epidemicData = this.pEpiData
          this.rCityData = this.pEpiData.statisGradeCityDetail
          this.provinceCompare = this.pEpiData.provinceCompare
          for (const city of this.rCityData) {
            this.pCityData.push({
               dead:city.dead,
               confirmAdd:city.confirmAdd,
               heal:city.heal,
               confirm:city.confirm,
               province:city.province,
               addr: city.province + city.city,
               count: city.nowConfirm})
          }
        }).then(async () => {
          for (const city of this.pCityData) {
            const response = await addr2Point(city.addr)
            if (response.data.status == 0) {
              const res = response.data.result
              if (res)
                this.cityData.push({
                  dead: city.dead,
                  confirmAdd: city.confirmAdd,
                  heal: city.heal,
                  confirm: city.confirm,
                  province: city.province,
                  lng: res.location.lng,
                  lat: res.location.lat,
                  count: city.count})
            }
          }
          localStorage.setItem('epidemicData', this.rEpiData)
          localStorage.setItem('cityData', JSON.stringify(this.cityData))
          localStorage.setItem('expire', Date.now() + 24 * 60 * 60)
        }).then(()=>{
          location.reload()
        })
      }
      else {
        console.log("else")
        this.epidemicData = JSON.parse(localStorage.getItem('epidemicData'))
        this.provinceCompare = this.epidemicData.provinceCompare
        this.chinaDayList = this.epidemicData.chinaDayList
        this.cityData = JSON.parse(localStorage.getItem('cityData'))
        console.log(this.epidemicData)
        console.log(this.cityData)
      }
    },
    handleWeekilyData() {
      const length = this.chinaDayList.length
      this.dayAmount = length
      for (let i = length - 1; i >= length - 7; i--) {
        const data = this.chinaDayList[i]
        this.chinaDayList.push(data)
        confirmed.splice(0, 0, data.localConfirm)
        curWeek.splice(0, 0, data.date)
      }
    },
    calculateSum() {
      confirmed.forEach(elm => {
        this.confirmedSum += elm
        this.sum += elm
      })
      closeContact.forEach(elm => {
        this.closeSum += elm
        this.sum += elm
      })
    },
    makeCityDataMap() {
      let set = new Set()
      this.cityData.forEach(elm => {
        set.add(elm.province)
        this.cityDataMap[elm.province] = {
          nowConfirm: 0,
          confirm: 0,
          confirmAdd: 0,
          heal: 0,
          dead: 0,
        }
        this.cityDataMap[elm.province].nowConfirm += elm.count
        this.cityDataMap[elm.province].confirm += elm.confirm
        this.cityDataMap[elm.province].confirmAdd += elm.confirmAdd
        this.cityDataMap[elm.province].heal += elm.heal
        this.cityDataMap[elm.province].dead += elm.dead
      })
      this.cityNameSet = Array.from(set)
      console.log(this.cityDataMap)
      console.log(this.cityNameSet)
    },
    onCityNameChanged(index) {
      this.curCityIndex = index
      console.log(this.cityNameSet[this.curCityIndex])
      this.$nextTick()
    }
  },
  created(){
  },
  mounted(){
    this.fetchEpidemicData()
    this.handleWeekilyData()
    this.calculateSum()
    this.makeCityDataMap()
  },
  components: {
    VueApexCharts,
    StatisticsCardLine,
    VxCard
  }
}
</script>

<style>
  #chinaEpiCard {
    height: 500px;
  }
</style>
