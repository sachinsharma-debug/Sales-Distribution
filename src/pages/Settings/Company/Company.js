import React from 'react'
import './Company.css'
import TextInputCom from '../../../component/TextInputCom'

export default function Company() {
  return (
    <>
    <div className='bg-white p-4'>
        <div className='row'>
            <div className='col-12'>
                <div className='d-flex justify-content-between pb-1' style={{borderBottom:"1px solid #e9ebec"}}>
                    <div className='sub-heading'>Company Details</div>
                    <div className='d-flex'>
                        <button class="btn btn-save">
                            <i class="fa-solid fa-floppy-disk"></i> Save
                        </button>

                        <button class="btn btn-cancel">
                            <i class="fa-solid fa-xmark"></i> Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-12 mt-3'>
                <div>Basic Details</div>
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-6 col-12'>
                <div class="form-group justify-content-between">
                    <div className='row'>
                        <div className='col-lg-4 my-auto'>
                            <label for="code">Code<span class="required-star">*</span></label>
                        </div>
                        <div className='col-lg-8'>
                            <input type="text" id="code" name="code" value="00001" required/>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="code">Name<span class="required-star">*</span></label>
                        </div>
                        <div className='col-lg-8'>
                            <input type="text" id="code" name="code" value="00001" required/>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="code">Address</label>
                        </div>
                        <div className='col-lg-8'>
                            {/* <input type="text" id="code" name="code" value="00001" required/> */}
                            <textarea name="message" rows="2" ></textarea>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="cars">State<span class="required-star">*</span></label>
                        </div>
                        <div className='col-lg-8'>
                            <select id="cars" name="cars" >
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="fiat">Fiat</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="cars">City</label>
                        </div>
                        <div className='col-lg-8'>
                            <select id="cars" name="cars" >
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="fiat">Fiat</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="code">Pincode</label>
                        </div>
                        <div className='col-lg-8'>
                            <input type="text" id="code" name="code" value="00001" required/>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="code">Phone</label>
                        </div>
                        <div className='col-lg-8'>
                            <input type="text" id="code" name="code" value="00001" required/>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="code">Mobile</label>
                        </div>
                        <div className='col-lg-8'>
                            <input type="text" id="code" name="code" value="00001" required/>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="code">Email</label>
                        </div>
                        <div className='col-lg-8'>
                            <input type="text" id="code" name="code" value="00001" required/>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="code">Website</label>
                        </div>
                        <div className='col-lg-8'>
                            <input type="text" id="code" name="code" value="00001" required/>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4 my-auto'>
                            <label for="cars">Currency</label>
                        </div>
                        <div className='col-lg-8'>
                            <select id="cars" name="cars" >
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="fiat">Fiat</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-4'>
                            <label for="cars">Company Logo</label>
                        </div>
                        <div className='col-lg-8'>
                            <form action="/action_page.php">
                                <input type="file" id="myFile" name="filename"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
