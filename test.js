// https://www.instagram.com/api/v1/friendships/3310056516/following/?count=12
// https://www.instagram.com/api/v1/friendships/3310056516/followers/?count=12&search_surface=follow_list_page
// https://www.instagram.com/api/v1/friendships/3310056516/following/?count=12&max_id=156



let followers = [{ username: "" }];

// =====> igname = Username IG yang akan dicheck
function cekfolbek(igname) {
    const username = "ekky.patria";

    (async () => {
        try {
            console.log(`PROSES DIJALANKAN...`);
            console.log(`Semakin banyak followers & following, proses akan semakin lama`);

            // proses mengetahui id instagram dari username
            const userQueryRes = await fetch(
                `https://www.instagram.com/web/search/topsearch/?query=${username}`
            );
            const userQueryJson = await userQueryRes.json();
            const userId = userQueryJson.users.map(u => u.user)
                .filter(
                    u => u.username === username
                )[0].pk;

            // 1. check followers
            console.log(`========================================`);
            console.log(`STEP-1 Melakukan pengecheckan data followers...`);
            let after = null;
            let big_list = true;
            while (big_list) {
                await fetch(
                    `https://www.instagram.com/graphql/query/?query_hash=aec5501414615eca36a9acf075655b1e&variables=` +
                    encodeURIComponent(
                        JSON.stringify({
                            id: userId,
                            include_reel: true,
                            fetch_mutual: true,
                            first: 12,
                            after: after,
                        })
                    )
                )
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res.data);
                        // has_next = res.data.user.edge_followed_by.page_info.has_next_page;
                        // after = res.data.user.edge_followed_by.page_info.end_cursor;
                        // followers = followers.concat(
                        //     res.data.user.edge_followed_by.edges.map(({ node }) => {
                        //         return {
                        //             username: node.username,
                        //         };
                        //     })
                        // );
                    });
            }
            // console.log(`Data followers sudah didapatkan...`);

        } catch (err) {
            console.log({ err });
        }
    })();
}

function lihatHasil() {
    console.log('=====> berikut adalah username IG yg gak folbek kamu: ');
    for (i = 0; i < folbek.length; i++) {
        console.log(folbek[i].username);
    }
    let resFolbek = folbek.map(a => a.username);
    

    copy(resFolbek);
    console.log(`========================================`);
    console.log( `Data sudah dicopy ke clipboard, silakan paste di media yang kamu inginkan`);
}
function copyData() {
    let resFolbek = folbek.map(a => a.username);
    

    copy(resFolbek);
    console.log(`========================================`);
    console.log( `Data sudah dicopy ke clipboard, silakan paste di media yang kamu inginkan`);
}

console.log('Untuk memulai, silakan ketik cekfolbek(namaIG) lalu tekan enter');
console.log('contoh: cekfolbek("siella_")');