import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 //solo recive el evento
  // @EventPattern('tech_created')
  // handleTechCreatedExample(data: any){//just example
  //   return this.appService.handleCreated(data)
  // }

  //envio respuesta :
  @MessagePattern({cmd: 'tech_created'})
    handleTechCreatedExample(data: any){//just example
    return this.appService.handleCreated(data)
  }
}
