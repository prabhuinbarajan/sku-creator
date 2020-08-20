import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core/';
import { SplitComponent, SplitAreaDirective } from 'angular-split'

//"fulfillmentInstruction": "<![CDATA[PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxGWVNfRGF0YUVudmVsb3BlPjxDb25maWd1cmF0aW9uPjxTZW5kZXJJbmZvcm1hdGlvbiBGWVNfQ2xpZW50SUQ9IjY4NTIiLz48L0NvbmZpZ3VyYXRpb24+PERvY3VtZW50cz48RG9jdW1lbnQ+PEdpZnRDYXJkIEZZU19SZXRhaWxlcklEPSI2MDMwMDAwODk2OSIgRllTX1Byb2dyYW1JRD0iMjQ5NzgiLz48L0RvY3VtZW50PjwvRG9jdW1lbnRzPjwvRllTX0RhdGFFbnZlbG9wZT4=]]>",

@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('split', {  }) split: SplitComponent
  @ViewChild('area1', {  }) area1: SplitAreaDirective
  @ViewChild('area2', {  }) area2: SplitAreaDirective

  direction: string = 'horizontal'
  sizes = {
    percent: {
      area1: 30,
      area2: 70,
    },
    pixel: {
      area1: 120,
      area2: '*',
      area3: 160,
    },
  }
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
      "FYS_ClientID": "6852",
      "FYS_RetailerID":"60300008969",
      "FYS_ProgramID":"24978",
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

  get code () {
    /**
     <?xml version="1.0" encoding="UTF-8" standalone="yes"?><FYS_DataEnvelope><Configuration><SenderInformation FYS_ClientID="6852"/></Configuration><Documents><Document><GiftCard FYS_RetailerID="60300008969" FYS_ProgramID="24978"/></Document></Documents></FYS_DataEnvelope>
    */
    var fulfillmentInstructionPlain = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><FYS_DataEnvelope><Configuration><SenderInformation FYS_ClientID="${this.model.fulfillment.FYS_ClientID}"/></Configuration><Documents><Document><GiftCard FYS_RetailerID="${this.model.fulfillment.FYS_RetailerID}" FYS_ProgramID="${this.model.fulfillment.c}"/></Document></Documents></FYS_DataEnvelope>`

    let newModel = JSON.parse(JSON.stringify(this.model))

    newModel.fulfillmentInstruction = '<![CDATA['+btoa(fulfillmentInstructionPlain)+']]>'
    delete newModel.fulfillment.FYS_ClientID;
    delete newModel.fulfillment.FYS_RetailerID;
    delete newModel.fulfillment.FYS_ProgramID;

    return JSON.stringify(newModel, null, 2);
  }

  

  options: FormlyFormOptions = {};
  fieldSku: FormlyFieldConfig[] = [
    {
      key: 'Textarea',
      type: 'textarea',
      templateOptions: {
        label: 'Private Key',
        placeholder: 'place your private key here',
        description: 'private key',
        rows: 5,
        required: true,
      },
    },
    {
      type: 'input',
      key: 'pemKey',
      templateOptions: {
        label: 'Private Key Password',
        type: 'password' // or 'email'
      }  
    }
  ];


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
              //console.log(model)
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
      wrappers: ['panel'],
      templateOptions: { label: 'fulfillment' },
      fieldGroup: [
        {
          key: 'FYS_ClientID',
          type: 'input',
          templateOptions: {
              required: true,
              type: 'text',
              label: 'FYS_ClientID',
          },
        }, 
        {
          key: 'FYS_RetailerID',
          type: 'input',
          templateOptions: {
              required: true,
              type: 'text',
              label: 'FYS_RetailerID',
          },
        }, 
        {
          key: 'FYS_ProgramID',
          type: 'input',
          templateOptions: {
              required: true,
              type: 'text',
              label: 'FYS_ProgramID',
          },
        }, 
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

  dragEnd(unit, { sizes }) {
    if (unit === 'percent') {
      this.sizes.percent.area1 = sizes[0]
      this.sizes.percent.area2 = sizes[1]
    } else if (unit === 'pixel') {
      this.sizes.pixel.area1 = sizes[0]
      this.sizes.pixel.area2 = sizes[1]
      this.sizes.pixel.area3 = sizes[2]
    }
  }
}



/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */