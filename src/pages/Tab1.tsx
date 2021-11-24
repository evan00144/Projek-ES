import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonImg className="logo" src="../assets/jantung.png" slot="start" />
          <IonTitle>JEK</IonTitle>
          <IonButtons slot="end">
            <IonButton href="/tab1" slot="end">
              Beranda
            </IonButton>
            <IonButton href="/tab2" slot="end">
              Gejala
            </IonButton>
            <IonButton href="/tab3" slot="end">
              Diagnosis
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid>
          <h2 className="ion-text-center ion-text-underline">
            Selamat Datang di Sistem Pakar Diagnosa Penyakit Jantung Koroner
          </h2>
          <IonGrid className="ion-padding wrapper">
            <IonRow>
              <IonCol>
                Penyakit Jantung Koroner adalah penyakit jantung yang disebabkan oleh
                penyempitan arteri koroner, mulai dari terjadinya kekakuan arteri
                maupun yang sudah terjadi penimbunan lemak pada dinding ateri koroner
              </IonCol>
              <IonCol>
                <IonImg className="gambar" src="https://d1bpj0tv6vfxyp.cloudfront.net/3pilihanpengobatanuntukatasipenyakitjantungkoronerhalodoc.jpg" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonImg className="gambar" src="https://www.phlbi.org/wp-content/uploads/atherosclerosis.jpg" />
              </IonCol>
              <IonCol>
                Faktor munculnya penyakit Jantung Koroner juga berkaitan erat dengan keturunan,
                gaya hidup dan pola hidup yang kurang sehat, misalnya kebiasaan merokok,
                minum alkohol, tekanan darah tinggi, diabetes, riwayat keturunan penyakit jantung
                koroner, obesitas, kurang beraktivitas, jenis kelamin dan stress
              </IonCol>
            </IonRow>
          </IonGrid>

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
