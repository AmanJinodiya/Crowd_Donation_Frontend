import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../../services/donation/donation.service';

import Swal from 'sweetalert2';
import { UserService } from '../../../services/user/user.service';
import { WindowRefService } from '../../../window-ref.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
  providers: [WindowRefService]
})
export class TransactionComponent implements OnInit {
  
  transactionData: any = {
    date: "12/06/2001",
      amount: '',
      name : '',
      user: {
        userId: 5
      },
      campaign: {
        campaignId: 9
      }
  }

  orderData: any = {
    amount:"",
    info : "order_request"
  }
  selectedAmount: number = 3500;
    customAmount: any;
    isIndian: boolean = true;
    formData = {
      fullName: '',
      anonymous: false,
      mobileNumber: '',
      email: '',
      billingAddress: '',
      pincode: '',
      updates: true
    };

    getCurrentDateFormatted(): string {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  
    onSubmit() {
      console.log('Form Data:', this.formData);
    }

    selectAmount(amount: number) {
      this.selectedAmount = amount;
        this.transactionData.amount = amount;
    }

  constructor(private _donationService : DonationService, private _userService : UserService,private winRef: WindowRefService,
    private _route : ActivatedRoute,private router : Router
  ){}
  ngOnInit(): void {
    this.transactionData.campaign.campaignId = this._route.snapshot.params['campaignId'];
    this.transactionData.date = this.getCurrentDateFormatted();
  }

  addDonation(){
    
    if (this.transactionData.amount == '' || this.transactionData.name == '') {
      alert('Fill all fields.');
      return;
    }
    if(this.formData.anonymous == true){
      this.transactionData.name = "anonymus"
    }
    this.transactionData.user.userId = this._userService.getUser().userId;
    // this.transactionData.name = this._userService.getUser().name;
    

    this.orderData.amount = this.transactionData.amount;

    this._userService.createOrder(this.orderData).subscribe(

      (data)=>{
        // Swal.fire("Successfully",'Added Campagin','success')
        console.log(data)
        if((data as any).status  == "created"){

          const options: any = {
            key: 'rzp_test_LPN0q02qY6t5ej',
            amount: (data as any).amount, // amount should be in paise format to display Rs 1255 without decimal point
            currency: 'INR',
            name: 'Crowd Donation', // company name or product name
            description: 'HeartFund is a dynamic crowd donation platform that empowers communities to support and uplift one another. ',  // product description
            image: 'https://plus.unsplash.com/premium_photo-1682104376321-63afb07e8f97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // company logo or product image
            order_id:  (data as any).id, // order_id created by you in backend
            modal: {
              // We should prevent closing of the form when esc key is pressed.
              escape: false,
            },
            notes: {
              // include notes if any
            },
            theme: {
              color: '#0c238a'
            },
            prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
              name: "Gaurav Kumar", //your customer's name
              email: "gaurav.kumar@example.com"//Provide the customer's phone number for better conversion rates 
          },
          };
          options.handler = ((response: any, error: any) => {
            options.response = response;
            console.log('admf')
            console.log(response);
            console.log(options);
            // call your backend api to verify payment signature & capture transaction

            this._donationService.addDonation(this.transactionData).subscribe(
              (data)=>{
                Swal.fire("Successfully",'Added Donation','success')
                console.log(data)
                window.location.href = "/home"
                
              },
              (error)=>{
                console.log(error)
                Swal.fire('Error',"server error",'error')
              }
            )

          });
          options.modal.ondismiss = (() => {
            // handle the case when user closes the form while transaction is in progress
            console.log('Transaction cancelled.');
          });
          const rzp = new this.winRef.nativeWindow.Razorpay(options);
          rzp.on('payment.failed', (response : any) => {
            
            });
    rzp.open();

        }
      },
      (error)=>{
        console.log(error)
        Swal.fire('Error',"server error",'error')
      }

    )

  }



}
