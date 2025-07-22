import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export async function generateResumePDF(resumeData: any) {
  const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    heading: { fontSize: 18, marginBottom: 5 },
    text: { fontSize: 12 },
  });

  const MyDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>{resumeData.name}</Text>
          <Text>{resumeData.email} | {resumeData.phone}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <Text>{resumeData.summary}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <Text>{resumeData.skills.join(', ')}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>
          {resumeData.experience.map((exp: any, i: number) => (
            <Text key={i}>{exp.title} - {exp.company} ({exp.years})</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {resumeData.education.map((edu: any, i: number) => (
            <Text key={i}>{edu.degree} - {edu.institution} ({edu.year})</Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return await pdf(MyDoc).toBlob();
}
