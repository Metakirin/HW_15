export class FormValidity {
  constructor(form) {
    this.form = form;
    this.btnSubmit = this.form.querySelector('button[type="submit"]');
    this.fields = [...this.form.querySelectorAll("input")];

    this.isValid = false;

    this.handleSubmitForm = this._submitForm.bind(this);
    this.handleDirect = this._direct.bind(this);

    this._init();
  }

  _init() {
    this.btnSubmit.addEventListener("click", this.handleSubmitForm);
    this._directFields();
  }

  _directFields() {
    this.fields.forEach((field) => {
      field.addEventListener("change", this.handleDirect);
    });
  }

  _direct(event) {
    const field = event.currentTarget;

    if (!field.checkValidity()) {
      field.classList.add("invalid");
    } else {
      field.classList.remove("invalid");
    }
  }

  _submitForm(event) {
    event.preventDefault();
    const newData = new Date();

    if (!this.form.checkValidity()) {
      this.form.classList.add("invalid");
      this.btnSubmit.classList.add("disabled");
    } else {
      this.form.classList.remove("invalid");
      this.btnSubmit.classList.remove("disabled");

      const formData = new FormData(this.form);
      formData.append("new Date", newData);
      const userData = {};

      for (let [name, value] of formData) {
        userData[name] = value;
      }

      this.form.reset();

      console.log(userData);
      console.log(newData);
    }
  }
}
