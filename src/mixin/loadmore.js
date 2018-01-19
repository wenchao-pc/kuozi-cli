// 单个下拉刷新混合
export default {
    data() {
        return {
            allLoaded: false,
            dataLoading: false,
            pageNo: 0,
        }
    },
    methods: {
        // 下拉刷新
        loadTop() {
            this.dataLoading = true;
            this.allLoaded = false;
            this.query(1).then(() => {
                this.$refs.loadmore.onTopLoaded();
                this.dataLoading = false;
            });
        },
        // 上拉加载更多
        loadBottom() {
            this.dataLoading = true;
            this.query(++this.pageNo).then(res => {
                if (res) {
                    this.allLoaded = true;
                }
                this.$refs.loadmore.onBottomLoaded();
                this.dataLoading = false;
            });
        },
    }

}