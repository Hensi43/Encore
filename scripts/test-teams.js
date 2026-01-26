const BASE_URL = 'http://localhost:3000';

async function testTeams() {
    console.log("🚀 Starting Team Feature Tests...\n");

    // 1. Create User A (Leader)
    const time = Date.now();
    const userA = {
        name: `Leader ${time}`,
        email: `leader${time}@test.com`,
        phone: '1234567890',
        college: 'Test College',
        year: '2',
        accommodation: 'no',
        paymentId: 'TEST_PAY_A',
        password: 'password123'
    };

    console.log("1️⃣ Registering User A (Leader)...");
    const resA = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userA)
    });
    const dataA = await resA.json();
    if (!resA.ok) return console.error("❌ Failed to register User A:", dataA);
    const leaderId = dataA.user.id;
    console.log("✅ User A Registered:", leaderId);

    // 2. Create Team
    console.log("\n2️⃣ User A creating 'Treasure Hunt' team...");
    const resTeam = await fetch(`${BASE_URL}/api/team/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: leaderId,
            eventSlug: 'treasure-hunt',
            teamName: 'The Hunters'
        })
    });
    const dataTeam = await resTeam.json();
    if (!resTeam.ok) return console.error("❌ Failed to create team:", dataTeam);
    const teamCode = dataTeam.team.code;
    console.log("✅ Team Created! Code:", teamCode);

    // 3. Create User B (Member)
    console.log("\n3️⃣ Registering User B (Member)...");
    const userB = {
        name: `Member ${time}`,
        email: `member${time}@test.com`,
        phone: '0987654321',
        college: 'Test College',
        year: '3',
        accommodation: 'no',
        paymentId: 'TEST_PAY_B',
        password: 'password123'
    };
    const resB = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userB)
    });
    const dataB = await resB.json();
    if (!resB.ok) return console.error("❌ Failed to register User B:", dataB);
    const memberId = dataB.user.id;
    console.log("✅ User B Registered:", memberId);

    // 4. Join Team
    console.log(`\n4️⃣ User B joining team '${teamCode}'...`);
    const resJoin = await fetch(`${BASE_URL}/api/team/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: memberId,
            teamCode: teamCode
        })
    });
    const dataJoin = await resJoin.json();
    if (!resJoin.ok) return console.error("❌ Failed to join team:", dataJoin);
    console.log("✅ User B Joined successfully!");

    // 5. Verify Membership
    console.log("\n5️⃣ Verifying User B's teams...");
    const resFetch = await fetch(`${BASE_URL}/api/user/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userB.email })
    });
    const dataFetch = await resFetch.json();
    if (dataFetch.teams && dataFetch.teams.length > 0) {
        console.log("✅ Verification Passed! Teams found:", dataFetch.teams.length);
        console.log("Team Name:", dataFetch.teams[0].name);
        console.log("Members:", dataFetch.teams[0].members.map(m => m.name).join(", "));
    } else {
        console.error("❌ Verification Failed: No teams found.");
    }

    // 6. Test Error Case: Duplicate Join
    console.log("\n6️⃣ Testing Duplicate Join (Should Fail)...");
    const resDup = await fetch(`${BASE_URL}/api/team/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: memberId,
            teamCode: teamCode
        })
    });
    const dataDup = await resDup.json();
    if (!resDup.ok) {
        console.log("✅ Correctly rejected duplicate join:", dataDup.error);
    } else {
        console.error("❌ TEST FAILED: Allowed duplicate join.");
    }
}

testTeams();
