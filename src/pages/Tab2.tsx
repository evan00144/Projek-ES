import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
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
          <h2 className="ion-text-center">
            Selamat Datang di Sistem Pakar Diagnosa Penyakit Jantung Koroner
          </h2>
          <IonGrid className="ion-padding wrapper">
            <IonRow className="ion-text-center">
              <IonCol>
              </IonCol>
              <IonCol>
                Gejala Penyakit Jantung Koroner
              </IonCol>
              <IonCol>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
              </IonCol>
              <IonCol>
                <IonImg className="gambar" src="https://d1bpj0tv6vfxyp.cloudfront.net/3pilihanpengobatanuntukatasipenyakitjantungkoronerhalodoc.jpg" />
              </IonCol>
              <IonCol>
              </IonCol>
            </IonRow>
            <br />
            <IonRow>
              Penyakit Jantung Koroner terjadi ketika pembuluh darah yang memasok
              darah ke jantung terhanbat akibat penumpukan plak atau aterosklerosis
            </IonRow>
            <br /><br />
            <IonRow>
              Penyakit jantung koroner umumnya ditandai oleh rasa tidak nyaman,
              nyeti, atau rasa tertekan dibagian dada. Selain itu, penyakit jantung
              koroner juga dapat menimbulkan berberapa gejala lain, seperti:
            </IonRow>
            <IonRow>
              1. Lemas dan Pusing
            </IonRow>
            <IonRow>
              2. jantung berdebar atau palpitasi
            </IonRow>
            <IonRow>
              3. Keringat Dingin
            </IonRow>
            <IonRow>
              4. Mual
            </IonRow>
            <IonRow>
              5. Napas pendek atau sesak napas
            </IonRow>
          </IonGrid>

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
