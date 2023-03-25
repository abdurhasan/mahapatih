
import { Body, Controller, Inject, Post , Get} from "@nestjs/common";
import { AppService } from "./app.service";
import { phoneNumberFormatter } from "./helpers";
import { SubmitInput } from "./types/submit.input";

@Controller('leads')
export class AppController {
  constructor(
    @Inject(AppService)
    private readonly service: AppService,
  ) { }



  @Post('submit')
  submit(
    @Body() { name, phone }: SubmitInput) {
    this.service.submit({ name, phone: phoneNumberFormatter(phone) })
    return { success: true }
  }

  @Get('list')
  list() {    
    return this.service.list()
  }
}
