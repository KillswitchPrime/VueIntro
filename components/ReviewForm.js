app.component("review-form",{
    template:
    /*html*/
    `
    <form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
        <h5>Would you recommend this product?</h5>
        <label for="yes">Yes</label>
        <input id="yes" v-model="{recommendation: true}" type="radio" name="recommendation">
        <label for="no">No</label>
        <input id="no" v-model="{recommendation: false}" type="radio" name="recommendation">

        <label for="name">Name:</label>
        <input id="name" v-model="name">

        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>

        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <input class="button" type="submit" value="Submit">
    </form>
    `,
    data(){
        return{
            recommendation: null,
            name:"",
            review:"",
            rating: null
        }
    },
    methods:{
        onSubmit(){
            if(this.name === "" || this.review === "" || this.rating === null || recommendation === null){
                alert("Review is incomplete, please fill out every field.");
                return;
            };

            const productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommendation: this.recommendation
            };

            this.$emit("review-submitted", productReview);

            this.name = "";
            this.review = "";
            this.rating = null;
            this.recommendation = null;
        }
    }
})