// import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue'
// import { ValidateableResponse } from '../../utils/validateable-response.js'
// import { Plan, IPlanRepository, IPlanService } from '../domain/model/plan.js'
// import { GetPagedResult } from '../domain/repository/base-repository.js'
// import { SqsMessage } from '../infrastructure/utils/sqs-message.js'

// export class PlanService implements IPlanService {
//   constructor(
//     private readonly planRepository: IPlanRepository = new PlanRepository(),
//     private readonly messageQueue: MessageQueue = new SqsMessage()
//   ) {}

//   public async get(id: string): Promise<ValidateableResponse<Plan>> {
//     const model = await this.planRepository.get(id)
//     if (!model) {
//       return {
//         errors: [`There is not a plan for the id '${id}'.`],
//       }
//     }
//     return { model }
//   }

//   public async create(input: Plan): Promise<ValidateableResponse<Plan>> {
//     // All the new plans must be on the Awaiting state
//     input.state = PlanState.Awaiting

//     // validate the plan object
//     const validation = planValidator.validate(input)

//     if (validation.error) {
//       const errors = validation.error.details.map((x) => x.message)
//       return { errors }
//     }

//     // create the plan on the database
//     const model = await this.planRepository.create(input)
//     return { model }
//   }

//   public async update(id: string, input: Plan): Promise<ValidateableResponse<Plan>> {
//     const validation = planValidator.validate(input)
//     if (validation.error) {
//       const errors = validation.error.details.map((x) => x.message)
//       return { errors }
//     }
//     const model = await this.planRepository.update(id, input)
//     return { model }
//   }

//   public async delete(id: string): Promise<ValidateableResponse<boolean>> {
//     const result = await this.planRepository.delete(id)
//     return { model: result }
//   }

//   public async getPlans(userId: string): Promise<GetPagedResult<Plan>> {
//     console.log(`Starting checking Plans`)

//     const plans = await this.planRepository.getPlans(userId)

//     const messages = plans.map((plan) => this.messageQueue.sendCheckInPlanMessage({ planId: plan.id }))

//     await Promise.all(messages)

//     return messages.length
//   }
// }
