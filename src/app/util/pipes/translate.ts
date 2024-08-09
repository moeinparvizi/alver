import {Pipe, PipeTransform} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Config} from "../../common/config";
import { ListResponse } from "../../models/data.response";
import { serviceApi } from "../../network/service/service.api";

@Pipe({
  name: 'translate',
  pure: false
})
export class SamaTranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService, private serviceApi: serviceApi) {
  }

  transform(text: string): string {
    if (this.translateService.getDefaultLang() === this.translateService.currentLang) {
      return text;
    } else {
      const letter = Config.letters.find((letter) => {
        return text === letter.Source && letter.SourceLanguage === this.translateService.getDefaultLang() && letter.TargetLanguage === this.translateService.currentLang;
      });
      if (letter) {
        return letter.Target;
      } else {
        const letter = {
          Source: text,
          Target: '',
          SourceLanguage: this.translateService.getDefaultLang(),
          TargetLanguage: this.translateService.currentLang
        };
        Config.letters.push(letter);
        this.serviceApi.postTranslate(this.translateService.getDefaultLang(), this.translateService.currentLang, text!).subscribe((res: ListResponse<any>) => {
          if (res.data && res.data.length === 1) {
            if (res.data[0].Target) {
              letter.Target = res.data[0].Target;
            } else {
            }
          }
        });
        return letter.Target;
      }
    }
  }
}
