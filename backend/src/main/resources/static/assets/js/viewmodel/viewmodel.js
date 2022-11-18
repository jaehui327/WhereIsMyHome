import RegModel from "../model/regModel.js";
import HomeDealModel from "../model/homedealModel.js";
import UserModel from "../model/userModel.js";

export default function ViewModel() {
  const regModel = new RegModel();
  const homedealModel = new HomeDealModel();
  const userModel = new UserModel();

  this.getSido = function () {
    return regModel.getSido();
  };

  this.getGugun = function (sido) {
    return regModel.getGugun(sido);
  };

  this.getDong = function (gugun) {
    return regModel.getDong(gugun);
  };

  this.getHomeDeal = function (regcode, year, month) {
    return homedealModel.getHomeDeal(regcode, year, month);
  };

  this.register = function (user) {
    return userModel.register(user);
  };

  this.login = function (user) {
    return userModel.login(user);
  };
}
