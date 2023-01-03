import { Injectable } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'

@Injectable({
    providedIn: 'root'
})
export class AdminSidebarService {
    toggled = false
    _hasBackgroundImage = true
    menus = []

    constructor(public api: ApiService) {

        this.menus = [
            {
                title: 'Dashboard',
                link: 'dashboard',
                icon: 'fa fa-tachometer-alt',
                active: true,
                type: 'simple'
            },
            {
                title: 'Prize',
                link: 'prizes',
                icon: 'fas fa-trophy',
                active: true,
                type: 'simple'
            },
            {
                title: 'Prize Winners',
                link: 'winners',
                icon: 'fas fa-trophy',
                active: true,
                type: 'simple'
            },
            {
                title: 'Settings',
                link: 'settings',
                icon: 'fa fa-cog',
                active: true,
                type: 'simple'
            },
            {
                title: 'Change Password',
                link: 'change-password',
                icon: 'fa fa-key',
                active: true,
                type: 'simple'
            }
        ] // menu
    }

    toggle() {
        this.toggled = !this.toggled
    }

    getSidebarState() {
        return this.toggled
    }

    setSidebarState(state: boolean) {
        this.toggled = state
    }

    getMenuList() {
        return this.menus
    }

    get hasBackgroundImage() {
        return this._hasBackgroundImage
    }

    set hasBackgroundImage(hasBackgroundImage) {
        this._hasBackgroundImage = hasBackgroundImage
    }
}
