import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core/';

@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {
    "productTemplateId": "07675012345",
    "processor": "OCS",
    "partnerSkuRef": "OCS",
    "programType": "OCS",
    "skuProgramName": "OCS",
    "card": {
      "activationType": "INSTANT_ISSUE",
      "expirationType": "ROLLING",
      "expirationRolling": 0,
      "serviceCode": "OCS"
    },
    "fulfillment": {
      "fulfillmentPartner": "ARROWEYE",
      "fulfillmentInstruction": "<![CDATA[PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxGWVNfRGF0YUVudmVsb3BlPjxDb25maWd1cmF0aW9uPjxTZW5kZXJJbmZvcm1hdGlvbiBGWVNfQ2xpZW50SUQ9IjY4NTIiLz48L0NvbmZpZ3VyYXRpb24+PERvY3VtZW50cz48RG9jdW1lbnQ+PEdpZnRDYXJkIEZZU19SZXRhaWxlcklEPSI2MDMwMDAwODk2OSIgRllTX1Byb2dyYW1JRD0iMjQ5NzgiLz48L0RvY3VtZW50PjwvRG9jdW1lbnRzPjwvRllTX0RhdGFFbnZlbG9wZT4=]]>",
      "cardImageFrontURL": "https~++bes%2Dfenton%2Ddevqa%2Dcard%2Dimages-s3-amazonaws-com+original+20191017110948_CardImageASI-jpg",
      "nameOnCard": "GIFT FOR YOU",
      "imageUrls": [
        {
          "type": "cardfront",
          "url": "https~++bes%2Dfenton%2Ddevqa%2Dcard%2Dimages-s3-amazonaws-com+original+20191017110948_CardImageASI-jpg"
        },
        {
          "type": "carrier_p001",
          "url": "https~++bes%2Dfenton%2Ddevqa%2Dcard%2Dimages-s3-amazonaws-com+original+20191017110948_CardImageASI-jpg"
        },
        {
          "type": "carrier_p004",
          "url": "https~++bes%2Dfenton%2Ddevqa%2Dcard%2Dimages-s3-amazonaws-com+original+20191017110948_CardImageASI-jpg"
        }
      ]
    }
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
    className: 'section-label',
    template: '<hr /><div><strong>SKU:</strong></div>',
    },

    {
        fieldGroupClassName: 'row',
        fieldGroup: [
        {
            className: 'col-6',
            type: 'input',
            key: 'productTemplateId',
            templateOptions: {
            label: 'productTemplateId',
            },
        },
        {
            className: 'col-6',
            type: 'input',
            key: 'programType',
            templateOptions: {
            label: 'programType',
            }
        },
        ],
    },
    {
        fieldGroupClassName: 'row',
        fieldGroup: [
        {
            className: 'col-6',
            type: 'input',
            key: 'partnerSkuRef',
            templateOptions: {
            label: 'partnerSkuRef',
            },
        },
        {
            className: 'col-6',
            type: 'input',
            key: 'processor',
            templateOptions: {
            label: 'processor',
            }
        },
        ],
    },
    {
        fieldGroupClassName: 'row',
        fieldGroup: [
        {
            className: 'col-6',
            type: 'input',
            key: 'skuProgramName',
            templateOptions: {
            label: 'skuProgramName',
            },
        }
        ],
    },
    {
        key: 'card',
        wrappers: ['panel'],
        templateOptions: { label: 'Card' },
        fieldGroup: [
          {
            key: 'activationType',
            type: 'select',
            templateOptions: {
                required: true,
                type: 'select',
                label: 'activationType',
                options: [
                  {label: 'INSTANT_ISSUE', value: 'INSTANT_ISSUE'},
                ]
            }
          }, 
          {
            key: 'expirationType',
            type: 'select',
            templateOptions: {
                required: true,
                type: 'select',
                label: 'expirationType',
                options: [
                  {label: 'ROLLING', value: 'ROLLING'},
                  {label: '60', value: '60'},

                ]
            }
          },

          {
            key: 'expirationRolling',
            type: 'input',
            templateOptions: {
                required: true,
                type: 'text',
                label: 'expirationRolling',
                max: 99999,
                min: 0,
                pattern: '\\d{2,5}',

            },
            hideExpression: (model: any, formState: any) => {
              // access to the main model can be through `this.model` or `formState`
              //if (formState.mainModel && formState.mainModel.card) {
              console.log(model)
              if (this.model.card) {
                return this.model.card.expirationType !== 'ROLLING' 
                //return formState.mainModel.card.expirationType !== "ROLLING"
              }
              return true;
            },
          },
          {
            key: 'serviceCode',
            type: 'input',
            templateOptions: {
                required: true,
                type: 'text',
                label: 'serviceCode',
            },
          } 
        ],
    },
    {
      key: 'fulfillment',
     //wrappers: ['panel'],
      templateOptions: { label: 'fulfillment' },
      fieldGroup: [
        {
          key: 'fulfillmentPartner',
          type: 'input',
          templateOptions: {
              required: true,
              type: 'text',
              label: 'fulfillmentPartner',
          },
        }, 
        {
          key: 'cardImageFrontURL',
          type: 'input',
          templateOptions: {
              required: true,
              type: 'text',
              label: 'cardImageFrontURL',
          },
        },
        {
          key: 'nameOnCard',
          type: 'input',
          templateOptions: {
              required: true,
              type: 'text',
              label: 'nameOnCard',
          },
        },
        {
          key: 'imageUrls',
          type: 'grid',
          className: 'ag-theme-balham',
          templateOptions: {
            height: '200px',
            gridOptions: {
              rowHeight: 42,
              columnDefs: [
                {
                  headerName: 'type',
                  field: 'type',
                  sortable: true,
                  width: 350,
                },
                {
                  headerName: 'url',
                  field: 'url',
                  sortable: true,
                  width: 350,
                }
              ],
            },
          },
          fieldArray: {
            fieldGroup: [
              {
                type: 'input',
                key: 'type',
                templateOptions: {
                  required: true,
                  readonly: true
                },
              },
              {
                type: 'input',
                key: 'url',
                templateOptions: {
                  required: true,
                },
              }
            ],
          },
        },
      ],
    }

  ];

  submit() {

    alert(JSON.stringify(this.model));
  }
}



/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */