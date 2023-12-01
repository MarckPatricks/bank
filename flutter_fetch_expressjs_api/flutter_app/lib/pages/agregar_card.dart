import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../config.dart';

class SearchedCardPage extends StatefulWidget {
  final String name;

  SearchedCardPage({required this.name});

  @override
  _SearchedCardPageState createState() => _SearchedCardPageState();
}

class _SearchedCardPageState extends State<SearchedCardPage> {
  Map<String, dynamic> card = {};

  @override
  void initState() {
    super.initState();
    _searchCardByName();
  }

  Future<void> _searchCardByName() async {
    final searchQuery = widget.name;
    final url = Uri.parse('${Config.serverUrl}/cards/get-card/$searchQuery');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final cardData = json.decode(response.body);
      setState(() {
        card = cardData;
      });
    } else {
      print('Error searching card: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Searched Card'),
      ),
      body: Column(
        children: [
          Text('Name: ${card['name']}'),
          Text('Number: ${card['number']}'),
          Text('CVV: ${card['cvv']}'),
          Text('Expiry: ${card['expiry']}'),
        ],
      ),
    );
  }
}
