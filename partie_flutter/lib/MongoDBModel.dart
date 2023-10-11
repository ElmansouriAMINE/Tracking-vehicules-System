// To parse this JSON data, do
//
//     final mongoDbModel = mongoDbModelFromJson(jsonString);

import 'dart:convert';
import 'package:mongo_dart/mongo_dart.dart';

MongoDbModel mongoDbModelFromJson(String str) =>
    MongoDbModel.fromJson(json.decode(str));

String mongoDbModelToJson(MongoDbModel data) => json.encode(data.toJson());

class MongoDbModel {
  MongoDbModel({
    required this.id,
    required this.latitude,
    required this.longitude,
    required this.vehicule_id,
    required this.createdAt,
    required this.updatedAt,
    required this.v,
  }); //createdAt  updatedAt  __v

  ObjectId id;
  ObjectId vehicule_id;
  double latitude;
  double longitude;
  DateTime createdAt;
  DateTime updatedAt;
  int v;

  factory MongoDbModel.fromJson(Map<String, dynamic> json) => MongoDbModel(
      id: json["_id"],
      vehicule_id: json["vehicule_id"],
      latitude: json["lat"],
      longitude: json["long"],
      createdAt: json["createdAt"],
      updatedAt: json["updatedAt"],
      v: json["__v"]);

  Map<String, dynamic> toJson() => {
        "_id": id,
        "vehicule_id": vehicule_id,
        "lat": latitude,
        "long": longitude,
        "createdAt": createdAt,
        "updatedAt": updatedAt,
        "__v": v
      };
}
