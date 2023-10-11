import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

import 'package:lab6/MongoDBModel.dart';
import 'package:lab6/dbHelper/mongodb.dart';
import 'package:mongo_dart/mongo_dart.dart' as M;
import 'package:device_info_plus/device_info_plus.dart';
import 'dart:io';
import 'package:intl/intl.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await MongoDatabase.connect();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Future<String> getUniqueDeviceId() async {
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

  Future<void> _insertData(double latitude, double longitude) async {
    var createdAt = DateTime.now();
    var updatedAt = DateTime.now();
    var __v = 0;
    var _id = M.ObjectId();
    var vehicule_id = await MongoDatabase.getVehiculeId();
    final data = MongoDbModel(
        id: _id,
        latitude: latitude,
        longitude: longitude,
        createdAt: createdAt,
        updatedAt: updatedAt,
        v: __v,
        vehicule_id: vehicule_id);
    print('aaaaaaaaaaaaaaaaaaaaa');
    print(vehicule_id);
    var result = await MongoDatabase.insert(data);
    // ScaffoldMessenger.of(context)
    //     .showSnackBar(SnackBar(content: Text("Inserted Id " + _id.$oid)));
  }

  LatLng _initialcameraposition = LatLng(33.2510521889, -8.43413114548);
  late GoogleMapController _controller;
  Location _location = Location();
  final Set<Marker> markers = new Set();
  void _onMapCreated(GoogleMapController _cntlr) {
    _controller = _cntlr;
    setState(() {
      markers;
    });

    _location.onLocationChanged.listen((l) {
      _controller.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(target: LatLng(l.latitude!, l.longitude!), zoom: 5),
        ),
      );
      _insertData(l.latitude!, l.longitude!);
      //_location.changeSettings(interval: 5000, distanceFilter: 100);

      setState(() {
        markers.add(Marker(
          //add first marker
          markerId: MarkerId('$l.latitude!'),
          position: LatLng(l.latitude!, l.longitude!), //position of marker
          infoWindow: InfoWindow(
            //popup info
            title: 'ma Voiture',
            snippet: 'My Custom Subtitle',
          ),
          icon: BitmapDescriptor.defaultMarker, //Icon for Marker
        ));
      });
    });
    _location.changeSettings(interval: 5000, distanceFilter: 500);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        child: Stack(
          children: [
            GoogleMap(
                initialCameraPosition:
                    CameraPosition(target: _initialcameraposition),
                mapType: MapType.normal,
                onMapCreated: _onMapCreated,
                myLocationEnabled: true,
                markers: markers),
          ],
        ),
      ),
    );
  }
}
