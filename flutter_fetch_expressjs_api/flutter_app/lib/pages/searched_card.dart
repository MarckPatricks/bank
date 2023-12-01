import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../config.dart';

class SearchedCardPage extends StatelessWidget {
  final Map<String, dynamic> card;

  const SearchedCardPage({Key? key, required this.card}) : super(key: key);

  Future<void> _deleteCard(String id, BuildContext context) async {
    final url = Uri.parse('${Config.serverUrl}/cards/delete-card/$id');
    final response = await http.delete(url);

    if (response.statusCode == 204) {
      Navigator.pop(context);
    } else {
      print('Error deleting card: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Searched Card'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text('Name: ${card['name']}'),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text('Number: ${card['number']}'),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                icon: Icon(Icons.edit),
                onPressed: () {
                },
              ),
              SizedBox(width: 16),
              IconButton(
                icon: Icon(Icons.delete),
                onPressed: () {
                  _deleteCard(card['_id'], context);
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}
