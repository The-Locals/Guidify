"use strict";

const TravelGuideModel = require("../models/travelGuideModel");

class TravelGuideManager {
  //returns a list of travel guides
  static async getTravelGuidesByPlaceId(placeId) {
    try {
      const docs = await TravelGuideModel.find({
        placeId: placeId,
      });
      return docs;
    } catch (err) {
      throw err;
    }
  }

  //return a travel guide by id
  static async getTravelGuideById(id) {
    try {
      const doc = await TravelGuideModel.findById(id);
      return doc;
    } catch (err) {
      throw err;
    }
  }

  //get all travel guides
  static async getAllTravelGuides() {
    try {
      const docs = await TravelGuideModel.find();
      return docs;
    } catch (err) {
      throw err;
    }
  }

  //verify a travel guide
  static async verifyTravelGuide(option, id) {
    try {
      const doc = await TravelGuideModel.findByIdAndUpdate(id, {
        verified: option,
      }, {new: true});
      return doc;
    } catch (err) {
      throw err;
    }

}

module.exports = TravelGuideManager;
