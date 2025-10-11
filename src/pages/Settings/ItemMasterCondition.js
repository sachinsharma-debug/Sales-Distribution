import React from 'react'
import { Form } from 'react-router-dom'
const stockItemParameters = [
  {
    id: 1,
    itemName: "Steel Rod",
    parameter: "Length",
    unit: "Meter",
    value: "6",
  },
  {
    id: 2,
    itemName: "Plastic Sheet",
    parameter: "Thickness",
    unit: "mm",
    value: "2",
  },
  {
    id: 3,
    itemName: "Paint",
    parameter: "Color Code",
    unit: "Code",
    value: "P-321",
  },
];
export default function ItemMasterCondition() {
  return (
    <>
    <div className='settings-content'>
        <div className='heading'>Item Master Condition</div>
        <form action="/action_page.php">
            <div className='row mt-4'>
                <div className='col-5 justify-content-between d-flex'>
                    <label for="fname" className='my-auto'>No. Of Parameter Required (1-25)</label>
                    <input type="text" id="fname" name="fname" className='px-2 my-input' style={{width:160}} />
                </div>
                <div className='offset-1 col-5 justify-content-between d-flex'>
                    <label for="lname" className='my-auto'>Saparator Type</label>
                    <input type="text" id="lname" name="lname" className='px-2 my-input' style={{width:160}} />
                </div>
                <div className='col-5 justify-content-between d-flex mt-2'>
                    <label for="fname" className='my-auto'>Set Parameter Level On</label>
                    <select name="fname" id="fname" className='my-input' style={{width:160}}>
                        <option value="volvo">Yes</option>
                        <option value="saab">No</option>
                    </select>
                </div>
                <div className='offset-1 col-5 justify-content-between d-flex mt-2'>
                    <label for="lname" className='my-auto'>Mailing Name Position After Line No.</label>
                    <input type="text" id="lname" name="lname" className='px-2 my-input' style={{width:160}} />
                </div>
            </div>
        </form>
        <div>
            <table className="parameter-table mt-5">
                <thead>
                <tr>
                    <th>SI No</th>
                    <th>Parameters</th>
                    <th>Title</th>
                    <th>Input Type</th>
                    <th>Usage</th>
                    <th>Print Name</th>
                </tr>
                </thead>
                <tbody>
                {stockItemParameters.map((item) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.itemName}</td>
                    <td>{item.parameter}</td>
                    <td>{item.unit}</td>
                    <td>{item.value}</td>
                    <td>{item.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}
