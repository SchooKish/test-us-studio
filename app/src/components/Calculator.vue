<template>
  <v-container>
    <v-form class="mt-10" action="http://n91239cs.beget.tech/mail.php">
      <v-text-field solo label="Сумма, руб" v-model="sum" name="sum" required @input="func" type="number" />
      <v-select
        solo
        label="Выберете валюту для перевода"
        name="valute"
        v-model="choosedValute"
        @input="func"
        required
        :items="nameValutes"
      ></v-select>
      <v-text-field outlined label="Сумма в валюте" name="result" readonly v-model="answer" />
      <v-text-field solo label="E-mail" name="mail" v-model="mail" :rules="emailRules" required />
      <v-btn dark type="submit">Записаться на обмен валюты</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sum: "",
      choosedValute: "",
      answer: "",
      mail: "",
      data: {},
      varValutes: [],
      nameValutes: [],
      valutes: [],
      quotation: [],
      emailRules: [(v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"],
    };
  },

  mounted() {
    // Делаем GET запрос на сервер
    axios.get("https://www.cbr-xml-daily.ru/daily_json.js").then((res) => {
      // Получаем результат
      // Получаем список валют, катировки и другие данные
      this.data = res.data.Valute;
      // Преобразуем все данные в массив
      this.varValutes = Object.entries(this.data);
      // Извлекаем из массива данных название валют двух видов и котировки
      this.varValutes.forEach(([key, value]) => {
        this.valutes.push(key);
        this.nameValutes.push(value.Name);
        this.quotation.push(value.Value);
      });
    });
  },

  methods: {
    // click() {
    //   console.log(this.data);
    // },

    func() {
      // Проверка, что оба поля заполнены
      if (this.sum && this.choosedValute) {
        // Получаем индекс выбранной валюты
        let id = this.nameValutes.indexOf(this.choosedValute, 0);
        // Делим рубли на необходимую валюту и оставляем 2 цифры после точки
        this.answer = Math.round((this.sum / this.quotation[id]) * 100) / 100;
      }
    },
  },
};
</script>
