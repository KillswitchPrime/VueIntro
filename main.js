const app = Vue.createApp({
    data(){
        return{
            product: "Socks",
            description: "Comfy bamboo socks for the budding developer!",
            image: "./assets/images/socks_green.avif",
            url: "https://avif.io",
            inventory: 9,
            onSale: false
        }
    }
})
