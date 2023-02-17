import ReviewsDAO from "../dao/reviewsDAO.js"
//this file responds to route requests and also updates the database via ReviewsDAO file

//all functions are exportable so hence they are in a single exportable class
export default class ReviewsController {
  //static functions dont need to have an instance be made, but can be called directly by ReviewController
  //async functions will allow to use await command to wait for certain things to return

  static async apiPostReview(req, res, next) {
    try {
      //all these things are fetched from the json
      const movieId = parseInt(req.body.movieId) //.body means getting from the json file attached to the url
      const review = req.body.review
      const user = req.body.user

      console.log('movieid', movieId)
      //waits reponse from reviewsDAO to let it add review to a specific movie via the provided info
      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review
      )
      //returned success
      res.json({ status: "success" })
    } catch (e) {
      //if an error was caught then this msg is returned
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      //for fetching a particular review
      let id = req.params.id || {} //.param are fetched from urls directly 
      // || {} means that it is either in url or it is empty
      let review = await ReviewsDAO.getReview(id) //fetches review associated with that id
      if (!review) {
        //if that review not found
        res.status(404).json({ error: "Not found" })
        //go out of this function
        return
      }
      //else return this review in json format
      res.json(review)
    } catch (e) {
      //if any error caught then log that error and return error in json
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id //from url
      const review = req.body.review //from json
      const user = req.body.user //from json

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )

      //if any error found
      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      // orif no modifications were made even after updating then throw this error
      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review",
        )
      }
      //otherwise success
      res.json({ status: "success" })
    } catch (e) {
      //report any error caught
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetReviews(req, res, next) { // forfetching all reviews for a specific movie
    try {
      let id = req.params.id || {}  //not a review id but movie id
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)
      if (!reviews) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(reviews)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}
