import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../config.dart';
import 'dashboard_page.dart';

class EditCardPage extends StatefulWidget {
  final String cardId;

  const EditCardPage({Key? key, required this.cardId}) : super(key: key);

  @override
  _EditCardPageState createState() => _EditCardPageState();
}

class _EditCardPageState extends State<EditCardPage> {
  TextEditingController _nameController = TextEditingController();
  TextEditingController _cvvController = TextEditingController();
  TextEditingController _expiryController = TextEditingController();
  TextEditingController _numberController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _getCardDetails();
  }

  Future<void> _getCardDetails() async {
    final url = Uri.parse('${Config.serverUrl}/cards/get-card-id/${widget.cardId}');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final cardDetails = json.decode(response.body);

      setState(() {
        _nameController.text = cardDetails['name'];
        _cvvController.text = cardDetails['cvv'];
        _expiryController.text = cardDetails['expiry'];
        _numberController.text = cardDetails['number'];
      });
    } else {
      print('Error fetching card details: ${response.statusCode}');
    }
  }

  Future<void> _updateCard() async {
    final url = Uri.parse('${Config.serverUrl}/cards/put-card/${widget.cardId}');
    final response = await http.put(
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode({
        'name': _nameController.text,
        'cvv': _cvvController.text,
        'expiry': _expiryController.text,
        'number': _numberController.text,
      }),
    );

    if (response.statusCode == 200) {
      Navigator.of(context).pop();
       Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => DashboardPage()),
      );
    } else {
      print('Error adding card: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Card'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _nameController,
              decoration: InputDecoration(labelText: 'Name'),
            ),
            TextField(
              controller: _cvvController,
              decoration: InputDecoration(labelText: 'CVV'),
            ),
            TextField(
              controller: _expiryController,
              decoration: InputDecoration(labelText: 'Expiry'),
            ),
            TextField(
              controller: _numberController,
              decoration: InputDecoration(labelText: 'Number'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _updateCard,
              child: Text('Update Card'),
            ),
          ],
        ),
      ),
    );
  }
}
