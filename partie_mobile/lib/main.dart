import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:platform_device_id/platform_device_id.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:device_info/device_info.dart';

void main() {
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
  late IO.Socket socket;
  List<double> locationsTable = [];

  String? deviceId;

  LatLng _initialcameraposition = LatLng(33.2463833, -8.4512767);
  late GoogleMapController _controller;
  Location _location = Location();
  var coords;
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
      setState(() {
        get(l);
        markers.add(Marker(
          //add first marker
          markerId: MarkerId('$l.latitude!'),
          position: LatLng(l.latitude!, l.longitude!), //position of marker
          infoWindow: InfoWindow(
            //popup info
            title: 'My Custom Title ',
            snippet: 'My Custom Subtitle',
          ),
          icon: BitmapDescriptor.defaultMarker, //Icon for Marker
        ));
      });
    });
   
  }

  @override
  void initState() {
    super.initState();
    initSocket();
    getDeviceId();
  }

  Future<void> initSocket() async {
    try {
      socket = IO.io("http://10.0.2.2:3700", <String, dynamic>{
        'transports': ['websocket'],
        'autoConnect': true,
      });

      socket.onConnect((data) => {print('connect :${socket.id}')});
    } catch (e) {
      print(e.toString());
    }
  }

  Future getDeviceId() async {
    String? Id;
    final DeviceInfoPlugin deviceInfoPlugin = new DeviceInfoPlugin();
    var build = await deviceInfoPlugin.androidInfo;
    try {
      Id = build.androidId;
      return Id;
    } catch (e) {
      //
    }
    return Id;
  }

  Future get(l) async {
    deviceId = await getDeviceId();
    coords = {
      'lat': l.latitude!,
      'lng': l.longitude!,
      'id': await getDeviceId()
    };
    if (locationsTable.contains(l.altitude) &&
        locationsTable.contains(l.longitude)) {
      print('waa haa l3aar akhtii ha l3aaar');
    } else {
      socket.emit("position-change", jsonEncode(coords));
      locationsTable.add(l.altitude!);
      locationsTable.add(l.longitude!);
    }
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
