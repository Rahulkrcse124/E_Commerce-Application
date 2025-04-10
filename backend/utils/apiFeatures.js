const { json } = require("body-parser");

class apiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr; 
  }




  // Search feature for API
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find(keyword);
    return this;
  }



  // Filter
  filter() {
    const queryCopy = { ...this.queryStr }; 

    // Removing some fields for categories
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for price and rating like (price range)
    let queryString = JSON.stringify(queryCopy); 
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    console.log(queryString);

    return this;
  }


  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1

    const skip = resultPerPage * (currentPage-1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = apiFeatures;
