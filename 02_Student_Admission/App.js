import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';

const Field = ({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry, multiline }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.multiline]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || label}
      placeholderTextColor="#999"
      keyboardType={keyboardType || 'default'}
      secureTextEntry={secureTextEntry || false}
      multiline={multiline || false}
    />
  </View>
);

const Choice = ({ label, options, value, onChange }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.choices}>
      {options.map(item => (
        <Pressable key={item} onPress={() => onChange(item)}
          style={[styles.choice, value === item && styles.selected]}>
          <Text style={{ color: value === item ? '#1D4ED8' : '#444' }}>{item}</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  page: { flexGrow: 1, backgroundColor: '#F4F6F8', padding: 20 },
  title: { fontSize: 26, fontWeight: '700', color: '#172033', marginBottom: 7 },
  intro: { color: '#667085', marginBottom: 20, lineHeight: 20 },
  card: { backgroundColor: '#FFF', padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  field: { marginBottom: 15 },
  label: { color: '#344054', fontWeight: '600', marginBottom: 7, fontSize: 13 },
  input: { borderWidth: 1, borderColor: '#D5DAE1', borderRadius: 8, padding: 12, fontSize: 14, color: '#172033' },
  multiline: { height: 90, textAlignVertical: 'top' },
  choices: { flexDirection: 'row', flexWrap: 'wrap' },
  choice: { borderWidth: 1, borderColor: '#D5DAE1', borderRadius: 8, padding: 10, marginRight: 8, marginBottom: 8 },
  selected: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  button: { backgroundColor: '#2563EB', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFF', fontWeight: '700' },
  note: { color: '#667085', textAlign: 'center', marginTop: 16, fontSize: 12 }
});

const empty = value => !String(value || '').trim();
const emailOK = value => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value || '');

export default function App() {
  const [student,setStudent]=useState(''), [dob,setDob]=useState(''), [nationality,setNationality]=useState(''), [email,setEmail]=useState(''), [phone,setPhone]=useState(''), [school,setSchool]=useState(''), [program,setProgram]=useState(''), [score,setScore]=useState(''), [gender,setGender]=useState('');
  const submit = () => {
    const errors = [];
    if ([student,dob,nationality,phone,school,program].some(empty)) errors.push('Complete all required student details.');
    if (!emailOK(email)) errors.push('Enter a valid email address.');
    if (Number(score) < 50 || Number(score) > 100 || empty(score)) errors.push('Academic score must be between 50 and 100.');
    if (empty(gender)) errors.push('Select a gender.');
    Alert.alert(errors.length ? 'Please check your form' : 'Success', errors.length ? errors.join('\n') : "Your admission details are valid.");
  };
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.title}>Student Admission Form</Text>
      <Text style={styles.intro}>Complete the student details for admission.</Text>
      <View style={styles.card}>
      <Field label="Student name" value={student} onChangeText={setStudent}/>
      <Field label="Date of birth (DD/MM/YYYY)" value={dob} onChangeText={setDob}/>
      <Choice label="Gender" options={['Female','Male','Other']} value={gender} onChange={setGender}/>
      <Field label="Nationality" value={nationality} onChangeText={setNationality}/>
      <Field label="Email address" value={email} onChangeText={setEmail} keyboardType="email-address"/>
      <Field label="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad"/>
      <Field label="Previous school" value={school} onChangeText={setSchool}/>
      <Field label="Program" value={program} onChangeText={setProgram}/>
      <Field label="Academic score (0–100)" value={score} onChangeText={setScore} keyboardType="numeric"/>
        <Pressable style={styles.button} onPress={submit}><Text style={styles.buttonText}>Submit</Text></Pressable>
      </View>
      <Text style={styles.note}>Please check your details before submitting.</Text>
    </ScrollView>
  );
}
