import React, { useState, useEffect } from 'react';
import * as axios from 'axios';


function App() {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('http://demo.sibers.com/users')
      .then(response => setContacts(response.data));
  }, []);

  return (
    <div className="App">
      {
        contacts.map(contact => <Contact 
          key={contact.id} 
          contact={contact}/>
        )
      }
    </div>
  );
}

function Contact({contact}) {
  return (
    <div>
      <span>{contact.name}</span>
      <span>{contact.email}</span>
      <span>{contact.phone}</span>
    </div>
  );
}

export default App;
