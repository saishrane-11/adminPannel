import { useEffect, useState } from "react"
export const Service = () => {
    const [services, setServices] = useState([]);
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/data/service", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            })
            console.log("service resp:" + response.ok);
            if (response.ok) {
                const serviceData = await response.json();
                console.log("serviceOKData: " + serviceData.msg);
                setServices(serviceData.msg);
                console.log("this is what service:" + services)
            }
        } catch (err) {
            console.log("Error in forntend fetching services");
        }
    }
    useEffect(() => {
        getServices();
    }, [])
    return <>
        <h1>Welcome to Service Page</h1>
        <ul>
        {services.map((service, index) => (
          <li key={index}>
            <h2>{service.service}</h2>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <p>Provider: {service.provider}</p>
          </li>
        ))}
      </ul>
        {/* <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>
            <div className="container grid grid-cols-3">
                <div className="card">
                    <div className="card-img">
                        <img src="abc.img" alt="Image" srcset="" />
                    </div>

                    {services.map((service, index) => (
                        <div className="card-details" key={index}>
                            <div className="grid grid-cols-2">
                                <p>{service.provider}</p>
                                <p>{service.price}</p>
                            </div>
                            <h2>{service.service}</h2>
                            <p>{service.description}</p>
                        </div>
                    ))}

                </div>
            </div>

        </section> */}
    </>

}
