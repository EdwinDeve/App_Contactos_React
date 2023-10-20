import { View, Text, TextInput,  TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { db } from '../../Data/Firebase';
import { estilos } from './Estilos';



const ContactosForm = () => {
  const [img, setImg] = useState('');
  const [mail, setMail] = useState('');
  const [nombre, setNombre] = useState('');
  const [tel, setTel] = useState('');
  const [id, setId] = useState('');
  const [Guardado, setGuardado] = useState(false);

  const guardarEnFirebase = () => {
    const datos = {
      Img: img,
      Mail: mail,
      Nombre: nombre,
      Tel: tel,
      id: id,
    };

    db.collection('Contactos')
      .add(datos)
      .then(() => {
        setImg('')
        setMail('')
        setNombre('')
        setTel('')
        setId('')
        setGuardado(true)
        console.log('Datos guardados correctamente en Firestore');
      })
      .catch((error) => {
        console.error('Error al guardar datos en Firestore:', error);
      });
  };

  const ocultarmensaje = () => {
    setGuardado(false);
  }

  return (
    <View style={estilos.ContenedorForm}>



      <TextInput
        placeholder="URL de la imagen"
        value={img}
        onChangeText={setImg}
        style={estilos.FormInput}
      />
      <View style={{ height: 20 }}></View>
      <TextInput
        placeholder="Correo electrónico"
        value={mail}
        onChangeText={setMail}
        style={estilos.FormInput}
      />
      <View style={{ height: 20 }}></View>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={estilos.FormInput}
      />
      <View style={{ height: 20 }}></View>
      <TextInput
        placeholder="Teléfono"
        value={tel}
        onChangeText={setTel}
        style={estilos.FormInput}
      />
      <View style={{ height: 20 }}></View>

      <TouchableOpacity
        style={estilos.botonGuardar}
        onPress={guardarEnFirebase}
      >
        <Text style={{ fontSize: 18 }}>
          Guardar
        </Text>
      </TouchableOpacity>
      <View style={{ height: 20 }}></View>
      {
        Guardado
          ?
          <View style={estilos.MensajeOperacion}>
            <Text style={{fontSize: 18}}>Se Guardo el contacto</Text>
            <TouchableOpacity
             style={estilos.botonGuardado}
             onPress={ocultarmensaje}
            >
              <Text>
                OK
              </Text>
            </TouchableOpacity>
          </View>
          :
          <Text></Text>
      }
    </View>
  );
}

export default function CrearContacto() {


  return (
    <View>
      <ContactosForm></ContactosForm>
    </View>
  )
}