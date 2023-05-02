import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  
  clientForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private gService: GeneralService,
    private router: Router
  ) {
    this.clientForm = this.formBuilder.group({
      id: ['', Validators.required],
      perfil_id: ['', Validators.required],
      address_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: '',
      phone: '',
      username: '',
      password: '',
      zipcode: '',
      address: '',
      country: 'Republica Dominicana',
      city: '',
      state: ''
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      
      this.getClient(id);
    });
  }

  /**
   * getClient
   */
  async getClient(id: string) {
    try {
      const dataClient = await this.gService.executeRequest(`client/view/${id}`);
      console.log(dataClient)

      if (dataClient.status == 200) {
        const dataPerfil = dataClient.data.Perfil;
        const dataAddress = dataClient.data.Address;

        this.clientForm.setValue({
          id: dataClient.data.id,
          perfil_id: dataClient.data.Perfil[0].id,
          address_id: dataClient.data.Address[0].id,
          first_name: dataClient.data.first_name,
          last_name: dataClient.data.last_name,
          phone: dataClient.data.phone,
          username: dataPerfil.length > 0 ? dataPerfil[0].username : '',
          password: dataPerfil.length > 0 ? dataPerfil[0].password : '',
          zipcode: dataAddress.length > 0 ? dataAddress[0].zipcode : '',
          address: dataAddress.length > 0 ? dataAddress[0].address : '',
          country: 'Republica Dominicana',
          city: dataAddress.length > 0 ? dataAddress[0].city : '',
          state: dataAddress.length > 0 ? dataAddress[0].state : ''
        });
        return;
      }
    } catch (error) {
      console.log('error: ', error)
      // No existe el id
    }
    alert('El record no existe');
    this.router.navigateByUrl('/');
  }

  /**
   * obSubmit
   */
   async onSubmit(clientData: any) {
    try {
      const resultC = await this.gService.executeRequestPut(clientData, `client/update/${clientData.id}`);
      const resultP = await this.gService.executeRequestPut(clientData, `perfil/update/${clientData.perfil_id}`);
      const resultA = await this.gService.executeRequestPut(clientData, `address/update/${clientData.address_id}`);

      console.log(resultC, resultP, resultA);
      if (
        resultC.status == 200 &&
        resultP.status == 200 &&
        resultA.status == 200
      ) {
        // Aqui va el codigo para crear al nuevo cliente
        alert('El cliente se ha actualizado correctamente.');
        this.router.navigateByUrl('/');
        return;
      }
      // Hubo un error creando al cliente
      alert('Ocurrio un error creando al cliente.')
    } catch (error) {
      console.log('error: ', error);
    }
  }

}
