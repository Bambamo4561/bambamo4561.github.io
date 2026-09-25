const SUPABASE_URL =
    "https://yqhuqriynwcpitjujljb.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_tPLXDubPXbGFCaIVgnKSbw_tNA8APLT";

const supabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

async function loadOrders() {

    const { data, error } =
        await supabase
            .from("orders")
            .select("*");

    if (error) {

        console.error(error);

        alert("Orders load nahi huay");

        return;
    }

    let table =
        document.getElementById(
            "ordersTable"
        );

    table.innerHTML = "";

    data.forEach(function(order) {

        table.innerHTML += `

        <tr>

            <td>${order.id}</td>

            <td>${order["Customer Name"]}</td>

            <td>${order["Phone"]}</td>

            <td>${order["Address"]}</td>

            <td>${order["Product"]}</td>

            <td>${order["Quantity"]}</td>

            <td>${order["Total
