import express from "express"
//we create this file to store info of what to do for each request
import ReviewsCtrl from "./reviews.controller.js"

//routes request to other parts of api
const router=express.Router()


//there are 4 types of request-get post put and delete

//example of routing-> (//"/" means base router)
// router.route("/").get((req,res)=> res.send("hello world")) //it will simply display hello world on the page 

// router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
// // :id means whatever after /movie/ is stored in a variable called id eg /movie/7857 here id=7857
// //this id is then used in apiGetReviews function of ReviewsCtrl file, it basically fetches all reviews of movie with that id

// router.route("/new").post(ReviewsCtrl.apiPostReview)
// //for posting a new review, post request is made when there is a change to be made

// router.route("/:id").get(ReviewsCtrl.apiGetReview).put(Reviews.apiUpdateReview).delete(ReviewsCtrl.apiDeleteReview)
// //"/:id" is for particular reviews


router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)



export default router
