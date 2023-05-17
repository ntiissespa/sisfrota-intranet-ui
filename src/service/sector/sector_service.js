import axios from "axios";
import AuthService from "../auth/auth_service";
import { gerarUrl } from "../../utilities/utils/Pageable";

export default class SectorService extends AuthService {

    findByLocal(localId) {
        return axios({
            method: "GET",
            url: this.api_url_intra + "sector/local/" + localId,
        }).then((res) => res.data);
    }
    findBySectorId(sectorId) {
        return axios({
            method: "GET",
            url: this.api_url_intra + "sector/" + sectorId,
        }).then((res) => res.data);
    }

    findAllByFilter(queryParams) {
        queryParams = gerarUrl(queryParams);
        return axios({
            method: "get",
            url: this.api_url_intra + "sector?" + queryParams,
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + this.token(),
            },
        }).then((res) => res.data);
    }

}