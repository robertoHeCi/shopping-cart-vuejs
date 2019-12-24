export default {
    methods:{
        getFormattedDecimal(number){
            return `${parseFloat(number).toFixed(2).replace('.', ',')}€`
        },
        isInteger(n) {
            return n === +n && n === (n|0);
        }
    }
}
