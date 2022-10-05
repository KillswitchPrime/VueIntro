app.component("product-display", {
    props: {
        premium: {
            type:  Boolean,
            require: true
        },
        cart: {
            type: Array,
            require: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <!-- bind data to vue objects using : in front of the regular HTML attributes-->
            <img :src="image" :class="[variants[selectedVariant].quantity < 1 ? 'out-of-stock-img' :'']"/>
          </div>
          <div class="product-info">
            <!-- double brackets to refer to vue objects -->
            <h1>{{ title }}</h1>

            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{backgroundColor: variant.color}"
            ></div>

            <p v-show="variants[selectedVariant].onSale">{{onSale}}</p>
            <p v-if="inStock">In Stock</p>
            <p v-else-if="variants[selectedVariant].quantity > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p>

            <div class="buttons">
              <button class="button" @:click="addToCart" :disabled=" !inStock" :class="{ disabledButton: !inStock}">Add to Cart</button>
              <button class="button" @:click="removeFromCart" :disabled="cart.length < 1" :class="[cart.length < 1 ? 'disabledButton' : '']">Remove from Cart</button>
            </div>

            <p>Shipping: {{shipping}}</p>

            <p>{{ description }}</p>

            <product-details :details="details"></product-details>

            <div v-for="size in sizes">{{size}}</div>

            <a :href="url"> &lt;- This .jpg was converted to .avif using avif.io</a>

          </div>
        </div>
        <review-list v-show="reviews.length > 0" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,
    data(){
        return{
            product: "Socks",
            brand: "Vue Mastery",
            description: "Comfy bamboo socks for the budding developer!",
            selectedVariant: 0,
            url: "https://avif.io",
            details: ["50% cotton", "30% wool", "20% polyester"],
            variants: [
                { id: 2234, color: "green", quantity: 50, image: "./assets/images/socks_green.avif", onSale: true},
                { id: 2235, color: "blue", quantity: 0, image: "./assets/images/socks_blue.avif", onSale: false}
            ],
            sizes: [
                "Small",
                "Medium",
                "Large"
            ],
            reviews: []
        };
    },
    methods:{
        addToCart(){
            this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
        },
        removeFromCart(){
            this.$emit("remove-from-cart");
        },
        updateVariant(index){
            this.selectedVariant = index;
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed:{
        title(){
            return this.brand + " " + this.product;
        },
        image(){
            return this.variants[this.selectedVariant].image;
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity > 10;
        },
        onSale(){
            return this.title + " is on sale!";
        },
        shipping(){
            if(this.premium){
                return "free";
            }else{
                return "$2.99";
            }
        }
    }
})