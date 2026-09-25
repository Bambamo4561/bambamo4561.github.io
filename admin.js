const SUPABASE_URL =
    "https://yqhuqriynwcpitjujljb.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_tPLXDubPXbGFCaIVgnKSbw_tNA8APLT";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ================================
// ADMIN LOGIN
// ================================

async function loginAdmin() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("loginMessage");


    if (!email || !password) {

        message.innerText =
            "Email aur password enter karein.";

        return;
    }


    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });


    if (error) {

        message.innerText =
            "Login failed: " + error.message;

        return;
    }


    console.log("ADMIN LOGIN SUCCESS");

    document.getElementById("loginBox").style.display =
        "none";

    document.getElementById("dashboard").style.display =
        "block";

    loadOrders();

}


// ================================
// LOAD ORDERS
// ================================

async function loadOrders() {

    const { data, error } =
        await supabaseClient
            .from("orders")
            .select("*")
            .order("created_at", {
                ascending: false
            });


    if (error) {

        document.getElementById("ordersTable").innerHTML =
            "<tr><td colspan='8'>" +
            "Orders load nahi huay: " +
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

                <td>Rs. ${order["Total"]}</td>

                <td>${order["Status"]}</td>

            </tr>

        `;

    });

}


// ================================
// LOGOUT
// ================================

async function logoutAdmin() {

    await supabaseClient.auth.signOut();

    document.getElementById("dashboard").style.display =
        "none";

    document.getElementById("loginBox").style.display =
        "block";

}
