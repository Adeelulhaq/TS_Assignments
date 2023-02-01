// #!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

let sleep = () => new Promise((r) => setTimeout(r, 2000))

console.log(' INSTRUCTIONS :')

let G_maxEnemyHealth = 100
let G_enemyAttackDamage = 50
let G_enemiesList = [`Skeleton`, `Warrior `, `Zombie  `, `Assassin`]


let G_health = 100
let G_attackDamage = 50
let G_totalHealthPotions = 3
let G_healthPotionHealAmount = 30
let G_healthPotionDropChance = 50 

let f_attackAnimation = (enemy:string) => new Promise((r) => {
    let stepsDone: string[] = []
    let stepsLeft = ['_', '_', '_', '_', '_', '_', '_', '_']
    console.log(chalk.whiteBright.bgBlack(`ATTACK:                                          `))
    const animation = setInterval(() => {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(chalk.bgBlack.whiteBright(`___________${chalk.bgRgb(0, 55, 0).whiteBright('/|You|*')}${stepsLeft.join('')}${chalk.bgRgb(55, 0, 0).whiteBright(`*|${enemy}|\\`)}${stepsDone.join('')}___________`))
        if (!stepsLeft.length) {
            process.stdout.write('\n')
            clearInterval(animation)
            r('')
        }
        stepsLeft.pop()
        stepsDone.push('_')
    }, 300);
})

console.log(`=) You can damage enemy UPTO ${G_attackDamage} Health`)
console.log(`=) Enemy can damage you UPTO ${G_enemyAttackDamage} Health`)
let running = true
let isRunAway = false

while (running) {
    let enemy = G_enemiesList[Math.floor(Math.random() * G_enemiesList.length)]
    let enemyHealth = Math.ceil(Math.random() * G_maxEnemyHealth)
    console.log(chalk.whiteBright(chalk.yellowBright(`\n\n<<<<<<<<<<<<<<  ${chalk.blueBright(`${enemy.trim()} Has Appeared`)}  >>>>>>>>>>>>>>\n`)))

    while (enemyHealth > 0) {
        console.log(`Your Health: ${G_health}`)
        console.log(`${enemy.trim()}'s Health: ${enemyHealth}`)
        const { choice }: { choice: 'Attack' | 'Drink Health Potion' | 'Run' } = await inquirer.prompt([{
            name: 'choice',
            message: 'What would you like to do ?',
            type: 'rawlist',
            choices: ['Attack', 'Drink Health Potion', 'Run']
        }])
        if (choice === 'Attack') {
            let damageDealt = Math.ceil(Math.random() * G_attackDamage)
            let damageTaken = Math.ceil(Math.random() * G_enemyAttackDamage)

            G_health -= damageTaken
            enemyHealth -= damageDealt

            await f_attackAnimation(enemy)

            console.log(`${chalk.redBright('>>>')} You strike the ${enemy.trim()} for ${chalk.redBright(damageDealt)} damage`)
            console.log(`${chalk.redBright('>>>')} ${enemy.trim()} damaged you for ${chalk.redBright(damageTaken)}`)
            if (G_health < 1) {
                break
            }
        }
        else if (choice === 'Drink Health Potion') {
            if (G_totalHealthPotions > 0) {
                let spinner = createSpinner('Healing').start()
                await sleep()
                G_totalHealthPotions--
                G_health += G_healthPotionHealAmount
                spinner.success({text:'Healed Up'})
                console.log(`${chalk.redBright('>>>')} You drink a health potion, healing yourself for ${chalk.redBright(G_healthPotionHealAmount)}`)
                console.log(`${chalk.redBright('>>>')} You now have ${chalk.redBright(G_health)} Health`)
                console.log(`${chalk.redBright('>>>')} You have ${chalk.redBright(G_totalHealthPotions)} health potion left`)
            }
            else {
                console.log(`${chalk.redBright('>>>')} You have 0 health potion. Defeat enemies to get a chance for one`)
            }
        }
        else {
            console.log(`${chalk.redBright('>>>')} You run away from the ${enemy.trim()}`)
            isRunAway = true
            break;
        }
        console.log(`\n`)
    }

    if (isRunAway) {
        isRunAway = false
        continue
    }
    if (G_health < 1 && enemyHealth < 1) {
        console.log(`  ${enemy.trim()} dropped BOMB, You Both were killed`)
        break
    }
    if (G_health < 1) {
        console.log(`  You were defeated by the ${enemy.trim()}`)
        break;
    }

    console.log(`  ${enemy.trim()} was defeated !!!`)
    console.log(`  You have ${G_health} Health left `)

    if (Math.ceil(Math.random() * 100) < G_healthPotionDropChance) {
      G_totalHealthPotions++
        console.log(`  The ${enemy.trim()} dropped a health potion `)
        console.log(`  You now have ${G_totalHealthPotions} health potions`)
    }

    const { choice }: { choice: 'Continue Fighting' | 'Exit' } = await inquirer.prompt([{
        name: 'choice',
        message: 'what would you like to do?',
        type: 'rawlist',
        choices: ['Continue Fighting', 'Exit']
    }])
    if (choice === 'Continue Fighting') {
        continue
    }
    break
}