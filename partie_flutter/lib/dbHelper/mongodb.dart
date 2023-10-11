import 'dart:developer';
import 'package:lab6/MongoDBModel.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:lab6/dbHelper/constant.dart';
import 'dart:io';
import 'package:device_info_plus/device_info_plus.dart';

class MongoDatabase {
  static var db, userCollection, userCollection2;
  static connect() async {
    db = await Db.create(MONGO_CONN_URL);
    await db.open();
    inspect(db);
    userCollection = db.collection(USER_COLLECTION);
    userCollection2 = db.collection(USER_COLLECTION2);
  }

  static Future<String> getUniqueDeviceId() async {
    String uniqueDeviceId = '';

    var deviceInfo = DeviceInfoPlugin();

    if (Platform.isIOS) {
      // import 'dart:io'
      var iosDeviceInfo = await deviceInfo.iosInfo;
      uniqueDeviceId =
          '${iosDeviceInfo.identifierForVendor}'; // unique ID on iOS
    } else if (Platform.isAndroid) {
      var androidDeviceInfo = await deviceInfo.androidInfo;
      uniqueDeviceId = '${androidDeviceInfo.id}'; // unique ID on Android
    }

    return uniqueDeviceId;
  }

  static Future<String> insert(MongoDbModel data) async {
    try {
      var result = await userCollection.insertOne(data.toJson());
      if (result.isSuccess) {
        return "Data Inserted";
      } else {
        return "Something wrong While inserting data";
      }
    } catch (e) {
      print(e.toString());
      return e.toString();
    }
  }

  static Future<ObjectId> getTracker() async {
    Db db = await Db.create(
        "mongodb+srv://amine:amine@cluster0.pmyqrf8.mongodb.net/test?retryWrites=true&w=majority");
    await db.open();
    DbCollection coll = db.collection('trackers');
    var device_id = await getUniqueDeviceId();
    var trackers =
        await coll.find(where.eq('adressemac', device_id).limit(1)).toList();
    var tracker_id = trackers[0]["_id"];
    print('cooooonecteeed');

    await db.close();
    return tracker_id;
  }

  static Future<ObjectId> getVehiculeId() async {
    Db db = await Db.create(
        "mongodb+srv://amine:amine@cluster0.pmyqrf8.mongodb.net/test?retryWrites=true&w=majority");
    await db.open();
    DbCollection coll1 = db.collection('helpers');
    DbCollection coll2 = db.collection('trackers');
    var device_id = await getUniqueDeviceId();
    var trackers =
        await coll2.find(where.eq('adressemac', device_id).limit(1)).toList();
    var tracker_id = trackers[0]["_id"];
    var vehicules =
        await coll1.find(where.eq('tracker_id', tracker_id).limit(1)).toList();
    var vehicule_id = vehicules[0]["vehicule_id"];
    print('cooooonecteeed');

    await db.close();
    return vehicule_id;
  }
}
