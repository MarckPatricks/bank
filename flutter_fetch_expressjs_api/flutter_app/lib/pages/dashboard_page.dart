// dashboard_page.dart
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../config.dart';
import 'searched_card.dart';
import 'agregar_card.dart';
import 'edit_page.dart';

class DashboardPage extends StatefulWidget {
  @override
  _DashboardPageState createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  List<Map<String, dynamic>> cards = [];
  TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _getCards();
  }

  Future<void> _getCards() async {
    final url = Uri.parse('${Config.serverUrl}/cards/get-cards');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      setState(() {
        cards = List<Map<String, dynamic>>.from(json.decode(response.body));
      });
    } else {
      print('Error fetching cards: ${response.statusCode}');
    }
  }

  Future<void> _searchCard() async {
    final searchQuery = _searchController.text;
    final url = Uri.parse('${Config.serverUrl}/cards/get-card/$searchQuery');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final card = json.decode(response.body);

      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => SearchedCardPage(card: card),
        ),
      );
    } else {
      print('Error searching card: ${response.statusCode}');
    }
  }

  Future<void> _deleteCard(String id) async {
    final url = Uri.parse('${Config.serverUrl}/cards/delete-card/$id');
    final response = await http.delete(url);

    if (response.statusCode == 204) {
      _getCards();
    } else {
      print('Error deleting card: ${response.statusCode}');
    }
  }

Future<void> _editCard(String id) async {
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => EditCardPage(cardId: id),
    ),
  );
}

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        return false;
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text('Dashboard'),
          actions: [
            PopupMenuButton<String>(
              onSelected: (value) {
                if (value == 'logout') {
                  Navigator.pop(context);
                } else if (value == 'agregar') {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => AgregarCardPage(),
                    ),
                  );
                }
              },
              itemBuilder: (BuildContext context) {
                return [
                  PopupMenuItem<String>(
                    value: 'logout',
                    child: ListTile(
                      leading: Icon(Icons.exit_to_app),
                      title: Text('Logout'),
                    ),
                  ),
                  PopupMenuItem<String>(
                    value: 'agregar',
                    child: ListTile(
                      leading: Icon(Icons.add),
                      title: Text('Agregar'),
                    ),
                  ),
                ];
              },
            ),
          ],
        ),
        body: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    decoration: InputDecoration(
                      labelText: 'Name',
                    ),
                  ),
                ),
                ElevatedButton(
                  onPressed: _searchCard,
                  child: Text('Search'),
                ),
              ],
            ),
            Expanded(
              child: ListView.builder(
                itemCount: cards.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(cards[index]['name']),
                    subtitle: Text(cards[index]['number']),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: Icon(Icons.edit),
                          onPressed: () {
                            _editCard(cards[index]['_id']);
                          },
                        ),
                        IconButton(
                          icon: Icon(Icons.delete),
                          onPressed: () {
                            _deleteCard(cards[index]['_id']);
                          },
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
