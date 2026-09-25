const SUPABASE_URL =
    "https://yqhuqriynwcpitjujljb.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_tPLXDubPXbGFCaIVgnKSbw_tNA8APLT";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

async function loadOrders() {

    const { data, error } =
        await supabaseClient
            .from("orders")
            .select("*");

    if (error) {

        document.getElementById("ordersTable").innerHTML =
            "<tr><td colspan='8'>Orders load nahi huay: " +
            error.message +
            "</td></tr>";

        return;
    }

    const table =
        document.getElementById("ordersTable");

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
                <td>${order["Total"]}</td>
                <td>${order["Status"]}</td>
            </tr>
        `;

    });

}

loadOrders();
