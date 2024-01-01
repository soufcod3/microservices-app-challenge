import {IocContainer} from "tsoa";
import {container, InjectionToken} from "tsyringe";
import {COMMENT_REPOSITORY} from "./DI-tokens";
import {DomainService} from "../../services/DomainService";

(() => {
   container.register(COMMENT_REPOSITORY, {useClass: DomainService});
})();

export const iocContainer: IocContainer = {
    get: <T>(controller: {prototype: T}) => {
        return container.resolve<T>(controller as InjectionToken<T>);
    }
}