import { testUserAgent } from '@ionic/core/dist/types/utils/platform';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { triggerAsyncId } from 'async_hooks';
import { SSL_OP_TLS_BLOCK_PADDING_BUG } from 'constants';
import { bookmark, calculator } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  const ageRef = useRef<HTMLIonInputElement>(null);
  const cholesterolRef = useRef<HTMLIonInputElement>(null);
  const sistoleRef = useRef<HTMLIonInputElement>(null);
  const gdRef = useRef<HTMLIonInputElement>(null);

  const [usiaMuda, setUsiaMuda] = useState<number>(0);
  const [usiaTua, setUsiaTua] = useState<number>(0);
  const [bpNormal, setBpNormal] = useState<number>(0);
  const [bpTinggi, setBpTinggi] = useState<number>(0);
  const [cholNormal, setCholNormal] = useState<number>(0);
  const [cholTinggi, setCholTinggi] = useState<number>(0);
  const [gdNormal, setGdNormal] = useState<number>(0);
  const [gdTinggi, setGdTinggi] = useState<number>(0);
  const [riskPoint, setRisk] = useState<number>(0);
  const [diagnosis, setDiagnosis] = useState<string>('');

  const [smoker, setSmoker] = useState<number>(0);
  const [numSmoker, setNumSmoker] = useState<string>('1');
  const [stress, setStress] = useState<number>(0);
  const [numStress, setNumStress] = useState<string>('1');
  const [diabetes, setDiabetes] = useState<number>(0);
  const [numDiabetes, setNumDiabetes] = useState<string>('1');

  const count = () =>{
    let age= ageRef.current!.value as number;
    let cholesterol= cholesterolRef.current!.value as number;
    let sistole= sistoleRef.current!.value as number;
    let gd = gdRef.current!.value as number;

    if(numSmoker == '1'){
      setSmoker(1);
    }
    else if (numSmoker== '2'){
      setSmoker(0);
    }

    if(numDiabetes == '1'){
      setDiabetes(1);
    }
    else if (numDiabetes== '2'){
      setDiabetes(0);
    }

    if(numStress == '0'){
      setStress(0);
    }
    else if (numStress == '0.5'){
      setStress(0.5);
    }
    else if (numStress == '1'){
      setStress(1);
    }

    inferenceEngine(age, sistole, cholesterol, gd, smoker, stress, diabetes)
  }

  const inferenceEngine = (usia: number, bp: number, chol: number, gd: number, smoker: number, stress: number, diabetes: number) => {
    let muda = 0;
    let tua = 0;
    let bpnormal = 0;
    let bptinggi = 0;
    let kolnormal = 0;
    let koltinggi = 0;
    let gdnormal = 0;
    let gdtinggi = 0;
    console.log("awal")
    //Usia Muda
    if (usia < 25) {
      setUsiaMuda(1);
      muda = 1;
    } else if (usia >= 25 && usia <= 45) {
      setUsiaMuda((45 - usia) / 20);
      muda = 1;
    } else if (usia > 45) {
      setUsiaMuda(0);
      muda = 1;
    }

    //Usia Tua
    if (usia < 40) {
      setUsiaTua(0);
      tua = 1;
    } else if (usia >= 40 && usia <= 60) {
      setUsiaTua((usia - 40) / 20);
      tua = 1;
    } else if (usia > 60) {
      setUsiaTua(1);
      tua = 1;
    }

    //BP Normal
    if (bp < 110) {
      setBpNormal(1);
      bpnormal = 1;
    } else if (bp >= 110 && bp <= 180) {
      setBpNormal((180 - bp) / 70);
      bpnormal = 1;
    } else if (bp > 180) {
      setBpNormal(0);
      bpnormal = 1;
    }

    //BP Tinggi
    if (bp < 130) {
      setBpTinggi(0);
      bptinggi = 1;
    } else if (bp >= 130 && bp <= 210) {
      setBpTinggi((bp - 130) / 80);
      bptinggi = 1;
    } else if (bp > 210) {
      setBpTinggi(1);
      bptinggi = 1;
    }

    //GD Normal
    if (gd < 70) {
      setGdNormal(1);
      gdnormal = 1;
    } else if (gd >= 70 && gd <= 110) {
      setGdNormal((110 - gd) / 40);
      gdnormal = 1;
    } else if (gd > 110) {
      setGdNormal(0);
      gdnormal = 1;
    }

    //GD Tinggi
    if (gd < 100) {
      setGdTinggi(0);
      gdtinggi = 1;
    } else if (gd >= 100 && gd <= 150) {
      setGdTinggi((gd - 100) / 50);
      gdtinggi = 1;
    } else if (gd > 150) {
      setGdTinggi(1);
      gdtinggi = 1;
    }

    if (chol < 110) {
      setCholNormal(1);
      kolnormal = 1;
    } else if (chol >= 110 && chol <= 150) {
      setCholNormal((150 - chol) / 40);
      kolnormal = 1;
    } else if (chol > 160) {
      setCholNormal(0);
      kolnormal = 1;
    }

    //Kolestrol Tinggi
    if (chol < 130) {
      setCholTinggi(0);
      koltinggi = 1;
    } else if (chol >= 130 && chol <= 160) {
      setCholTinggi((chol - 130) / 30);
      koltinggi = 1;
    } else if (chol > 160) {
      setCholTinggi(1);
      koltinggi = 1;
    }
    console.log("sebelum risk");
    let rules: number[] = [0];
    let hasil: string[] = ["Besar"];
    let total = 0;
    let index = 0;
    let risk;
    
    //Usia muda
      //Tekanan darah normal
        //Kolestrol normal
          //Gula darah normal
            //Perokok Tidak
              //Diabetes Tidak
                //Stress
                  if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                    rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                    risk = 1-rules[index];
                    hasil[index] = "Kecil";
                    total += risk;
                    index++;
                  }
                  if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                    rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                    risk = 1-rules[index];
                    hasil[index] = "Kecil";
                    total += risk;
                    index++;
                  }
                  if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                    rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                    risk = 1-rules[index];
                    hasil[index] = "Kecil";
                    total += risk;
                    index++;
                  }
              //Diabetes punya
                //Stress
                if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 1){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
          //Perokok ya
              //Diabetes Tidak
                //Stress
                if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 1){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
            //Diabetes punya
              //Stress
              if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                risk = rules[index];
                hasil[index] = "Besar";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdNormal);
                risk = rules[index];
                hasil[index] = "Besar";
                total += risk;
                index++;
              }
        //Gula darah Tinggi
            //Perokok Tidak
              //Diabetes Tidak
                //Stress
                if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
            //Diabetes punya
              //Stress
              if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
        //Perokok ya
            //Diabetes Tidak
              //Stress
              if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
              risk = rules[index];
              hasil[index] = "Besar"
              total += risk;
              index++;
            }
            if(muda == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaMuda, bpNormal, cholNormal, gdTinggi);
              risk = rules[index];
              hasil[index] = "Besar"
              total += risk;
              index++;
            }
    //Kolestrol Tinggi
          //Gula darah normal
            //Perokok Tidak
              //Diabetes Tidak
                //Stress
                if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                  rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
            //Diabetes punya
              //Stress
              if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
        //Perokok ya
            //Diabetes Tidak
              //Stress
              if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
            if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdNormal);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
      //Gula darah Tinggi
          //Perokok Tidak
            //Diabetes Tidak
              //Stress
              if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
      //Perokok ya
          //Diabetes Tidak
            //Stress
            if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0){
              rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
              rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 1){
              rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
        //Diabetes punya
          //Stress
          if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0){
            rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
            rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
          if(muda == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 1){
            rules[index] = Math.max(usiaMuda, bpNormal, cholTinggi, gdTinggi);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
    //Tekanan darah Tinggi
        //Kolestrol normal
          //Gula darah normal
            //Perokok Tidak
              //Diabetes Tidak
                //Stress
                  if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                    rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                    risk = 1-rules[index];
                    hasil[index] = "Kecil";
                    total += risk;
                    index++;
                  }
                  if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                    rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                    risk = 1-rules[index];
                    hasil[index] = "Kecil";
                    total += risk;
                    index++;
                  }
                  if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                    rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                    risk = 1-rules[index];
                    hasil[index] = "Kecil";
                    total += risk;
                    index++;
                  }
              //Diabetes punya
                //Stress
                if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 1){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
          //Perokok ya
              //Diabetes Tidak
                //Stress
                if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 1){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
            //Diabetes punya
              //Stress
              if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                risk = rules[index];
                hasil[index] = "Besar";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdNormal);
                risk = rules[index];
                hasil[index] = "Besar";
                total += risk;
                index++;
              }
        //Gula darah Tinggi
            //Perokok Tidak
              //Diabetes Tidak
                //Stress
                if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
            //Diabetes punya
              //Stress
              if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
        //Perokok ya
            //Diabetes Tidak
              //Stress
              if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
            if(muda == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholNormal, gdTinggi);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
    //Kolestrol Tinggi
          //Gula darah normal
            //Perokok Tidak
              //Diabetes Tidak
                //Stress
                if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                  rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
            //Diabetes punya
              //Stress
              if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
        //Perokok ya
            //Diabetes Tidak
              //Stress
              if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
            if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdNormal);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
      //Gula darah Tinggi
          //Perokok Tidak
            //Diabetes Tidak
              //Stress
              if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
      //Perokok ya
          //Diabetes Tidak
            //Stress
            if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 1){
              rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
        //Diabetes punya
          //Stress
          if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0){
            rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
            rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
          if(muda == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 1){
            rules[index] = Math.max(usiaMuda, bpTinggi, cholTinggi, gdTinggi);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
  //Usia Tua
      //Tekanan darah normal
        //Kolestrol normal
          //Gula darah normal
            //Perokok Tidak
              //Diabetes Tidak
                //Stress
                if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                  rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                  rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                  rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
            //Diabetes punya
              //Stress
              if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0){
                rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
                rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 1){
                rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
        //Perokok ya
            //Diabetes Tidak
              //Stress
              if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdNormal);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
      //Gula darah Tinggi
          //Perokok Tidak
            //Diabetes Tidak
              //Stress
              if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
      //Perokok ya
          //Diabetes Tidak
            //Stress
            if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0){
              rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 1){
              rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
        //Diabetes punya
          //Stress
          if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0){
            rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
            rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
          if(tua == 1 && bpnormal == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 1){
            rules[index] = Math.max(usiaTua, bpNormal, cholNormal, gdTinggi);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
  //Kolestrol Tinggi
        //Gula darah normal
          //Perokok Tidak
            //Diabetes Tidak
              //Stress
              if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
      //Perokok ya
          //Diabetes Tidak
            //Stress
            if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0){
              rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 1){
              rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
        //Diabetes punya
          //Stress
          if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0){
            rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
            rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
          if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 1){
            rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdNormal);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
    //Gula darah Tinggi
        //Perokok Tidak
          //Diabetes Tidak
            //Stress
            if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0){
              rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 1){
              rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
        //Diabetes punya
          //Stress
          if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0){
            rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
            rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 1){
            rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
    //Perokok ya
        //Diabetes Tidak
          //Stress
          if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0){
            rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
            rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 1){
            rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
      //Diabetes punya
        //Stress
        if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0){
          rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
          risk = 1-rules[index];
          hasil[index] = "Kecil";
          total += risk;
          index++;
        }
        if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
          rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
          risk = rules[index];
          hasil[index] = "Besar";
          total += risk;
          index++;
        }
        if(tua == 1 && bpnormal == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 1){
          rules[index] = Math.max(usiaTua, bpNormal, cholTinggi, gdTinggi);
          risk = rules[index];
          hasil[index] = "Besar";
          total += risk;
          index++;
        }
  //Tekanan darah Tinggi
      //Kolestrol normal
        //Gula darah normal
          //Perokok Tidak
            //Diabetes Tidak
              //Stress
                if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                  rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                  rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
                if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                  rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
                  risk = 1-rules[index];
                  hasil[index] = "Kecil";
                  total += risk;
                  index++;
                }
            //Diabetes punya
              //Stress
              if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0){
                rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
                rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 1){
                rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
        //Perokok ya
            //Diabetes Tidak
              //Stress
              if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdNormal);
              risk = rules[index];
              hasil[index] = "Besar";
              total += risk;
              index++;
            }
      //Gula darah Tinggi
          //Perokok Tidak
            //Diabetes Tidak
              //Stress
              if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
      //Perokok ya
          //Diabetes Tidak
            //Stress
            if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0){
              rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 1){
              rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
        //Diabetes punya
          //Stress
          if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0){
            rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
            rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
          if(tua == 1 && bptinggi == 1 && kolnormal == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 1){
            rules[index] = Math.max(usiaTua, bpTinggi, cholNormal, gdTinggi);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
  //Kolestrol Tinggi
        //Gula darah normal
          //Perokok Tidak
            //Diabetes Tidak
              //Stress
              if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0){
                rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
                rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
              if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 0 && stress == 1){
                rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
                risk = 1-rules[index];
                hasil[index] = "Kecil";
                total += risk;
                index++;
              }
          //Diabetes punya
            //Stress
            if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0){
              rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 0 && diabetes == 1 && stress == 1){
              rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
      //Perokok ya
          //Diabetes Tidak
            //Stress
            if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0){
              rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 0 && stress == 1){
              rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
        //Diabetes punya
          //Stress
          if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0){
            rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
            rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
          if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdnormal == 1 && smoker == 1 && diabetes == 1 && stress == 1){
            rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdNormal);
            risk = rules[index];
            hasil[index] = "Besar";
            total += risk;
            index++;
          }
    //Gula darah Tinggi
        //Perokok Tidak
          //Diabetes Tidak
            //Stress
            if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0){
              rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 0.5){
              rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
            if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 0 && stress == 1){
              rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
              risk = 1-rules[index];
              hasil[index] = "Kecil";
              total += risk;
              index++;
            }
        //Diabetes punya
          //Stress
          if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0){
            rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 0.5){
            rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 0 && diabetes == 1 && stress == 1){
            rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
    //Perokok ya
        //Diabetes Tidak
          //Stress
          if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0){
            rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 0.5){
            rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
          if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 0 && stress == 1){
            rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
            risk = 1-rules[index];
            hasil[index] = "Kecil";
            total += risk;
            index++;
          }
      //Diabetes punya
        //Stress
        if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0){
          rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
          risk = 1-rules[index];
          hasil[index] = "Kecil";
          total += risk;
          index++;
        }
        if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 0.5){
          rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
          risk = rules[index];
          hasil[index] = "Besar";
          total += risk;
          index++;
        }
        if(tua == 1 && bptinggi == 1 && koltinggi == 1 && gdtinggi == 1 && smoker == 1 && diabetes == 1 && stress == 1){
          rules[index] = Math.max(usiaTua, bpTinggi, cholTinggi, gdTinggi);
          risk = rules[index];
          hasil[index] = "Besar";
          total += risk;
          index++;
        }

      var totalRules = 0;
      for(var i = 0 ; i < index ; i++){
        totalRules = totalRules + rules[i];
        console.log(rules[i]);
        console.log(totalRules);
      }

      console.log("TotalRules" + totalRules);
      console.log("Total" + total);
      let riskTotal = 0;
      riskTotal = total / totalRules;
      console.log(total);


      let max = 0;
      let flag = 0;

      for(var i = 0; i < index; i++){
        if(rules[i] >= 0){
          max = rules[i];
          flag = i;
        }
      }
      setRisk(riskTotal);
      console.log(max);
      setDiagnosis(hasil[flag]);
  }

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
          <IonGrid color="dark">
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Age
                  </IonLabel>
                  <IonInput ref={ageRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Cholestrol (mg/dl)
                  </IonLabel>
                  <IonInput ref={cholesterolRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <br />
            <IonRow>
              <IonCol>
                <IonLabel position="floating">
                  Blood Pressure (mm/Hg)
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Systolic (mm/Hg)
                  </IonLabel>
                  <IonInput ref={sistoleRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Gula Darah (mg/dl)
                  </IonLabel>
                  <IonInput ref={gdRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Are you an active smoker?</IonLabel>
                  <IonSelect value={numSmoker} placeholder="Select One" onIonChange={e => setNumSmoker(e.detail.value)}>
                    <IonSelectOption value="1">Yes</IonSelectOption>
                    <IonSelectOption value="2">No</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Diabetes</IonLabel>
                  <IonSelect value={numDiabetes} placeholder="Select One" onIonChange={e => setNumDiabetes(e.detail.value)}>
                    <IonSelectOption value="1">Yes</IonSelectOption>
                    <IonSelectOption value="2">No</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Stress Level</IonLabel>
                  <IonSelect value={numStress} placeholder="Select One" onIonChange={e => setNumStress(e.detail.value)}>
                    <IonSelectOption value="0">Ringan</IonSelectOption>
                    <IonSelectOption value="0.5">Sedang</IonSelectOption>
                    <IonSelectOption value="1">Berat</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-left">
                <IonButton onClick={count}>
                  <IonIcon slot="start" icon={calculator}></IonIcon>
                  Calculate
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <h2>Risk Percentage : {riskPoint}</h2>
                  <h2>Risk : {diagnosis}</h2>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>``

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
